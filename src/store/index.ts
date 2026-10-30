import { createStore, Store, useStore as baseUseStore } from 'vuex'
import type { InjectionKey } from 'vue'

// 1. Defines la interfaz para el Estado Global
export interface State {
  contador: number;
  usuario: string | null;
}

// 2. Defines una clave de inyección para mantener el autocompletado en los componentes
export const key: InjectionKey<Store<State>> = Symbol()

// 3. Creas la Store definiendo el tipo <State>
export const store = createStore<State>({
  state: {
    contador: 0,
    usuario: null
  },
  getters: {
    getContador(state: State): number {
      return state.contador
    }
  },
  mutations: {
    INCREMENTAR(state: State): void {
      state.contador++
    }
  },
  actions: {}
})

// 4. Helper personalizado para tener autocompletado de tipos al llamar useStore()
export function useStore() {
  return baseUseStore(key)
}