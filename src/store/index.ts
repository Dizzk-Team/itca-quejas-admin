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
  },
  // En src/store/index.ts
  actions: {
    async fetchSolicitudes({ commit }) {
      commit('SET_CARGANDO', true)
      commit('SET_ERROR', null)
      try {
        const response = await fetch('https://itca-quejas-api.onrender.com/api/reportes')
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        const res = await response.json()
        
        // Extrae la lista si la API la envía dentro de "data" o "solicitudes", o usa res si es array directo
        const listaSolicitudes = Array.isArray(res) 
          ? res 
          : (res.data || res.solicitudes || [])

        commit('SET_SOLICITUDES', listaSolicitudes)
      } catch (err: any) {
        commit('SET_ERROR', err.message || 'Error al conectar con la API')
        commit('SET_SOLICITUDES', []) // Restablece a array vacío si falla
      } finally {
        commit('SET_CARGANDO', false)
      }
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}