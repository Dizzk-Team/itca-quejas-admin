import { createStore, Store, useStore as baseUseStore } from 'vuex'
import type { InjectionKey } from 'vue'

export interface Solicitud {
  _id?: string
  id?: string
  creador_id: string
  created_at: string
  ubicacion_exacta: string
  descripcion: string
  categoria: string
  estado: string
  evidencias_url?: string[]
}

export interface State {
  solicitudes: Solicitud[]
  cargando: boolean
  error: string | null
}

export const key: InjectionKey<Store<State>> = Symbol()

const API_URL = 'https://itca-quejas-api.onrender.com/api'

export const store = createStore<State>({
  state: {
    solicitudes: [],
    cargando: false,
    error: null,
  },
  mutations: {
    SET_SOLICITUDES(state, payload: Solicitud[]) {
      state.solicitudes = payload
    },
    SET_CARGANDO(state, payload: boolean) {
      state.cargando = payload
    },
    SET_ERROR(state, payload: string | null) {
      state.error = payload
    },
    UPDATE_SOLICITUD_ESTADO(state, payload: { id: string; estado: string }) {
      const item = state.solicitudes.find(s => (s._id || s.id) === payload.id)
      if (item) {
        item.estado = payload.estado
      }
    },
  },
  actions: {
    async fetchSolicitudes({ commit }) {
      commit('SET_CARGANDO', true)
      commit('SET_ERROR', null)
      try {
        const response = await fetch(`${API_URL}/reportes`)

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        const res = await response.json()
        const listaSolicitudes = Array.isArray(res)
          ? res
          : res.data || res.solicitudes || []

        commit('SET_SOLICITUDES', listaSolicitudes)
      } catch (err: any) {
        commit('SET_ERROR', err.message || 'Error al conectar con la API')
        commit('SET_SOLICITUDES', [])
      } finally {
        commit('SET_CARGANDO', false)
      }
    },

    async obtenerTokenTemporal() {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          correo_institucional: 'diego.huezo@itca.edu.sv',
          password: 'password',
        }),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo autenticar en la API`)
      }

      const data = await response.json()
      const token = data.access_token || data.token || data.data?.token

      if (!token) {
        throw new Error('La respuesta de /login no devolvió un token válido')
      }

      localStorage.setItem('token', token)
      return token
    },

    async actualizarEstadoSolicitud({ commit, dispatch }, payload: { id: string; estado: string }) {
      let token = localStorage.getItem('token')

      if (!token) {
        token = await dispatch('obtenerTokenTemporal')
      }

      const enviarPeticion = (authToken: string) =>
        fetch(`${API_URL}/reportes/${payload.id}/estado`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ estado: payload.estado }),
        })

      let response = await enviarPeticion(token!)

      // Si el token guardado expiró, renueva credenciales y reintenta una vez
      if (response.status === 401) {
        localStorage.removeItem('token')
        token = await dispatch('obtenerTokenTemporal')
        response = await enviarPeticion(token!)
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo actualizar el estado`)
      }

      commit('UPDATE_SOLICITUD_ESTADO', payload)
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}