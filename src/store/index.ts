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
  asignado_a?: string | null
  evidencias_url?: string[]
}

export interface Encargado {
  id: string
  nombre_completo: string
  rol: string
  departamento_o_carrera: string
}

export interface State {
  solicitudes: Solicitud[]
  cargando: boolean
  error: string | null
  actualizadoEn: string | null
}

export const key: InjectionKey<Store<State>> = Symbol()

const API_URL = 'https://itca-quejas-api.onrender.com/api'

const getSessionHeaders = () => {
  const token = localStorage.getItem('token_sesion')
  if (!token || token === 'undefined' || token === 'null') {
    throw new Error('Tu sesión expiró. Inicia sesión nuevamente.')
  }

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${localStorage.getItem('tipo_token') || 'Bearer'} ${token}`,
  }
}

export const store = createStore<State>({
  state: {
    solicitudes: [],
    cargando: false,
    error: null,
    actualizadoEn: null,
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
    SET_ACTUALIZADO_EN(state, payload: string) {
      state.actualizadoEn = payload
    },
    UPDATE_SOLICITUD_GESTION(
      state,
      payload: { id: string; estado: string; asignado_a: string | null },
    ) {
      const item = state.solicitudes.find(s => (s._id || s.id) === payload.id)
      if (item) {
        item.estado = payload.estado
        item.asignado_a = payload.asignado_a
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

        if (!Array.isArray(listaSolicitudes)) {
          throw new Error('La API devolvió una lista de reportes inválida.')
        }

        commit('SET_SOLICITUDES', listaSolicitudes)
        commit('SET_ACTUALIZADO_EN', new Date().toISOString())
        return true
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al conectar con la API'
        commit('SET_ERROR', message)
        return false
      } finally {
        commit('SET_CARGANDO', false)
      }
    },

    async fetchEncargados() {
      const response = await fetch(`${API_URL}/encargados`, {
        headers: getSessionHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo cargar el personal encargado`)
      }

      const result = await response.json()
      if (!Array.isArray(result.data)) {
        throw new Error('La API devolvió una lista de encargados inválida.')
      }

      return result.data as Encargado[]
    },

    async gestionarSolicitud(
      { commit },
      payload: { id: string; estado: string; asignado_a: string | null },
    ) {
      const response = await fetch(
        `${API_URL}/reportes/${encodeURIComponent(payload.id)}/estado`,
        {
          method: 'PUT',
          headers: getSessionHeaders(),
          body: JSON.stringify({
            estado: payload.estado,
            asignado_a: payload.asignado_a,
          }),
        },
      )

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        const validationMessage = result?.errors
          ? Object.values(result.errors).flat().join(' ')
          : null
        throw new Error(
          validationMessage || result?.message || `Error ${response.status}: No se pudo guardar la gestión`,
        )
      }

      commit('UPDATE_SOLICITUD_GESTION', payload)
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}
