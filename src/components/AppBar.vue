<template>
    <v-app-bar flat border color="white" elevation="0">
        <!-- Icono de menú hamburguesa -->
        <v-app-bar-nav-icon @click="$emit('toggle-drawer')" color="#0f172a"></v-app-bar-nav-icon>

        <!-- Título del sistema -->
        <v-app-bar-title class="text-subtitle-1 font-weight-bold text-slate-800">
            Administración de Quejas
        </v-app-bar-title>

        <!-- Empuja todo el contenido posterior a la derecha -->
        <v-spacer></v-spacer>

        <!-- Sección de usuario fija en la barra superior -->
        <div class="user-area d-flex align-center gap-3 mr-4">
            <!-- Botón de notificaciones -->
            <v-btn icon variant="text" size="small" class="rounded-circle text-slate-600">
                <v-icon icon="mdi-bell-outline" size="20"></v-icon>
            </v-btn>

            <!-- Avatar e Información del perfil -->
            <div class="d-flex align-center gap-2 cursor-pointer">
                <v-avatar color="blue-lighten-4" size="36">
                    <span class="text-caption font-weight-bold text-primary">ML</span>
                </v-avatar>

                <div class="d-flex flex-column text-left">
                    <span class="user-name">María López</span>
                    <span class="user-role">Administradora</span>
                </div>

                <v-icon icon="mdi-chevron-down" size="18" color="#64748b"></v-icon>
            </div>
        </div>
    </v-app-bar>
</template>

<script setup lang="ts">
    defineEmits(['toggle-drawer'])
</script>

<style scoped>
    .text-slate-800 {
        color: #0f172a !important;
    }

    .text-slate-600 {
        color: #475569 !important;
    }

    .user-name {
        font-size: 0.8rem;
        font-weight: 700;
        color: #0f172a !important;
        line-height: 1.1;
    }

    .user-role {
        font-size: 0.7rem;
        color: #64748b !important;
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