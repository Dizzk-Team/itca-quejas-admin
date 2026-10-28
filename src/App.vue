<template>
  <v-app>
    <!-- Drawer de Vuetify -->
    <v-navigation-drawer color="#0f233a" class="custom-drawer" theme="dark" permanent expand-on-hover rail
      location="left">
      <!-- Cabecera con Logo ITCA-FEPADE (Opción 2: Vector SVG de la silueta) -->
      <v-list-item class="py-3">
        <template #prepend>
          <v-avatar color="white" rounded="lg" size="38" class="me-3 d-flex align-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f233a" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <!-- Techo triangular -->
              <path d="M3 9.5L12 3l9 6.5" />
              <line x1="3" y1="9.5" x2="21" y2="9.5" />
              <!-- Columnas -->
              <line x1="5" y1="13" x2="5" y2="18" />
              <line x1="8.5" y1="13" x2="8.5" y2="18" />
              <line x1="12" y1="13" x2="12" y2="18" />
              <line x1="15.5" y1="13" x2="15.5" y2="18" />
              <line x1="19" y1="13" x2="19" y2="18" />
              <!-- Base inferior -->
              <line x1="3" y1="20.5" x2="21" y2="20.5" />
            </svg>
          </v-avatar>
        </template>
        <v-list-item-title class="font-weight-bold text-white text-subtitle-1">
          ITCA-FEPADE
        </v-list-item-title>
      </v-list-item>

      <v-divider class="border-opacity-25 my-1"></v-divider>

      <v-list density="compact" nav base-color="white" color="white">
        <!-- Subtítulo de Sección -->
        <v-list-subheader class="text-caption text-uppercase text-grey-lighten-1 font-weight-bold">
          ADMINISTRACIÓN
        </v-list-subheader>

        <v-list-item link to="/" title="Inicio" prepend-icon="mdi-view-grid-outline" class="text-white"
          active-class="bg-blue-darken-3 text-white"></v-list-item>

        <v-list-item link to="/SolicitudesView" title="Gestión de Solicitudes" prepend-icon="mdi-clipboard-text-outline"
          class="text-white" active-class="bg-blue-darken-3 text-white"></v-list-item>

        <v-list-item link to="/MetricasView" title="Métricas" prepend-icon="mdi-chart-line" class="text-white"
          active-class="bg-blue-darken-3 text-white"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Barra superior -->
    <AppBar />

    <!-- Contenido principal -->
    <v-main class="main-wrapper">
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import AppBar from './components/AppBar.vue'
</script>

<style>

  /* Forzar que texto e iconos del menú sean siempre blancos */
  .custom-drawer .v-list-item,
  .custom-drawer .v-list-item-title,
  .custom-drawer .v-icon {
    color: #ffffff !important;
  }

  /* Subencabezado de sección */
  .custom-drawer .v-list-subheader {
    color: #94a3b8 !important;
  }

  /* Sobrescribe el estado activo (seleccionado) */
  .v-list-item--active {
    background-color: #1e3553 !important;
    color: #ffffff !important;
  }

  /* Color al pasar el cursor (hover) */
  .v-list-item:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
    color: #ffffff !important;
  }

  /* Asegura que el drawer quede sobre las vistas */
  .custom-drawer {
    z-index: 9999 !important;
  }

  .main-wrapper {
    background-color: #f3f5f8;
    min-height: 100vh;
  }
</style>