<template>
  <v-app>
    <!-- Drawer de Vuetify (oculto en el login) -->
    <v-navigation-drawer v-if="!esLogin" color="#9b0c23" class="custom-drawer" theme="dark" permanent expand-on-hover rail
      location="left">
      
      <!-- Cabecera con Imagen de Logo -->
      <v-list-item class="py-3">
        <template #prepend>
          <v-avatar color="white" rounded="lg" size="38" class="me-3 d-flex align-center justify-center pa-1">
            <v-img :src="logo" alt="Logo ITCA" contain></v-img>
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
          active-class="text-white"></v-list-item>

        <v-list-item link to="/SolicitudesView" title="Gestión de Solicitudes" prepend-icon="mdi-clipboard-text-outline"
          class="text-white" active-class="text-white"></v-list-item>

        <v-list-item link to="/MetricasView" title="Métricas" prepend-icon="mdi-chart-line" class="text-white"
          active-class="text-white"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Barra superior (oculta en el login) -->
    <AppBar v-if="!esLogin" />

    <!-- Contenido principal -->
    <v-main class="main-wrapper">
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { RouterView, useRoute } from 'vue-router'
  import AppBar from './components/AppBar.vue'
  import logo from '@/assets/EscudoItca.jpg'

  const route = useRoute()
  const esLogin = computed(() => route.path === '/login')
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
    color: #e8cf75 !important;
  }

  /* Línea dorada en el borde del menú */
  .custom-drawer {
    border-right: 3px solid #c9a227 !important;
  }

  /* Sobrescribe el estado activo (seleccionado) */
  .v-list-item--active {
    background-color: rgba(201, 162, 39, 0.35) !important;
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