<template>
    <v-app-bar flat border color="white" elevation="0" class="appbar-itca">
        <!-- Icono de menú hamburguesa -->
        <v-app-bar-nav-icon @click="$emit('toggle-drawer')" color="#9b0c23"></v-app-bar-nav-icon>

        <!-- Título del sistema -->
        <v-app-bar-title class="text-subtitle-1 font-weight-bold titulo-sistema">
            Administración de Quejas
        </v-app-bar-title>

        <!-- Empuja todo el contenido posterior a la derecha -->
        <v-spacer></v-spacer>

        <!-- Sección de usuario fija en la barra superior -->
        <div class="user-area d-flex align-center gap-3 mr-4">
            <!-- Botón de notificaciones -->
            <v-btn icon variant="text" size="small" class="rounded-circle icono-notificacion">
                <v-icon icon="mdi-bell-outline" size="20"></v-icon>
            </v-btn>

            <!-- Avatar e Información del perfil -->
            <div class="d-flex align-center gap-2 cursor-pointer">
                <v-avatar color="#fbf6e6" size="36" class="avatar-itca">
                    <span class="text-caption font-weight-bold avatar-iniciales">DL</span>
                </v-avatar>

                <div class="d-flex flex-column text-left">
                    <span class="user-name">Denis Lue</span>
                    <span class="user-role">Administradora</span>
                </div>

                <v-icon icon="mdi-chevron-down" size="18" color="#c9a227"></v-icon>
            </div>
        </div>
    </v-app-bar>
</template>

<script setup lang="ts">
    defineEmits(['toggle-drawer'])
</script>

<style scoped>
    /* Línea dorada bajo la barra */
    .appbar-itca {
        border-bottom: 3px solid #c9a227 !important;
    }

    .titulo-sistema {
        color: #9b0c23 !important;
    }

    .icono-notificacion {
        color: #9b0c23 !important;
    }

    .avatar-itca {
        border: 2px solid #c9a227;
    }

    .avatar-iniciales {
        color: #9b0c23;
    }

    .user-name {
        font-size: 0.8rem;
        font-weight: 700;
        color: #333333 !important;
        line-height: 1.1;
    }

    .user-role {
        font-size: 0.7rem;
        color: #7a6a2a !important;
        line-height: 1.1;
    }

    .gap-2 {
        gap: 0.5rem;
    }

    .gap-3 {
        gap: 0.75rem;
    }

    .cursor-pointer {
        cursor: pointer;
    }
</style>