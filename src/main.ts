import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'

// 1. Importar estilos e iconos de Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// 2. Importar creador de Vuetify, componentes y directivas
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 3. Crear la instancia de Vuetify
const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(store, key) // Tu store de Vuex
app.use(router)
app.use(vuetify)    // <-- Registramos Vuetify

app.mount('#app')