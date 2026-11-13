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

        <!-- Sección de usuario en la barra superior -->
        <div class="user-area d-flex align-center gap-3 mr-4">
            
            <!--  Botón y Menú de Notificaciones -->
            <v-menu location="bottom end" transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                    <v-btn icon variant="text" size="small" class="rounded-circle icono-notificacion" v-bind="props">
                        <v-badge 
                            :content="notificaciones.length" 
                            :model-value="notificaciones.length > 0" 
                            color="#9b0c23"
                            offset-x="-2"
                            offset-y="-2"
                        >
                            <v-icon icon="mdi-bell-outline" size="20"></v-icon>
                        </v-badge>
                    </v-btn>
                </template>

                <v-card width="340" class="elevation-3 rounded-lg mt-2">
                    <v-card-item class="text-white py-3" style="background-color: #9b0c23 !important;">
                        <v-card-title class="text-subtitle-2 font-weight-bold">
                            Quejas Recientes
                        </v-card-title>
                        <template v-slot:append>
                            <v-chip size="x-small" color="white" class="font-weight-bold" style="color: #9b0c23;">
                                {{ notificaciones.length }} registradas
                            </v-chip>
                        </template>
                    </v-card-item>

                    <v-divider></v-divider>

                    <v-list lines="two" density="compact" v-if="notificaciones.length > 0">
                        <v-list-item 
                            v-for="(item, index) in notificaciones.slice(0, 5)" 
                            :key="item.id || index" 
                            to="/SolicitudesView"
                        >
                            <template v-slot:prepend>
                                <v-avatar color="#fbf6e6" size="34" class="avatar-itca">
                                    <v-icon icon="mdi-alert-circle-outline" size="18" color="#9b0c23"></v-icon>
                                </v-avatar>
                            </template>
                            <v-list-item-title class="font-weight-bold text-caption">
                                {{ item.titulo || item.asunto || `Queja #${item.id || index + 1}` }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="text-caption text-truncate">
                                {{ item.descripcion || item.detalle || 'Sin descripción' }}
                            </v-list-item-subtitle>
                        </v-list-item>
                    </v-list>

                    <div v-else class="text-center py-5 text-grey">
                        <v-icon icon="mdi-bell-off-outline" size="28" class="mb-1"></v-icon>
                        <p class="text-caption">No hay quejas recientes</p>
                    </div>

                    <v-divider></v-divider>
                    <v-card-actions class="justify-center py-1">
                        <v-btn variant="text" size="x-small" color="#9b0c23" to="/SolicitudesView" class="font-weight-bold">
                            Ver todas las solicitudes
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>

            <!--  Avatar e Información del perfil con Menú Desplegable -->
            <v-menu location="bottom end" transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                    <div v-bind="props" class="d-flex align-center gap-2 cursor-pointer px-2 py-1 rounded-pill perfil-hover">
                        <v-avatar color="#fbf6e6" size="36" class="avatar-itca">
                            <span class="text-caption font-weight-bold avatar-iniciales">{{ inicialesUsuario }}</span>
                        </v-avatar>

                        <div class="d-flex flex-column text-left">
                            <span class="user-name">{{ nombreUsuario }}</span>
                            <span class="user-role">{{ rolUsuario }}</span>
                        </div>

                        <v-icon icon="mdi-chevron-down" size="18" color="#c9a227"></v-icon>
                    </div>
                </template>

                <v-card width="250" class="elevation-3 rounded-lg mt-2">
                    <v-card-item class="text-center pt-4 pb-2">
                        <v-avatar color="#fbf6e6" size="50" class="avatar-itca mb-2">
                            <span class="text-subtitle-1 font-weight-bold avatar-iniciales">{{ inicialesUsuario }}</span>
                        </v-avatar>
                        <div class="font-weight-bold text-body-2" style="color: #9b0c23;">
                            {{ nombreUsuario }}
                        </div>
                        <div class="text-caption text-grey-darken-1">
                            {{ correoUsuario }}
                        </div>
                    </v-card-item>

                    <v-divider class="my-1"></v-divider>

                    <v-list density="compact" nav>
                        <v-list-item 
                            prepend-icon="mdi-logout" 
                            title="Cerrar Sesión" 
                            @click="cerrarSesion" 
                            class="text-error font-weight-bold"
                        ></v-list-item>
                    </v-list>
                </v-card>
            </v-menu>

        </div>
    </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

defineEmits(['toggle-drawer'])

const router = useRouter()

const notificaciones = ref<any[]>([])
const nombreUsuario = ref(localStorage.getItem('nombre_usuario') || 'Administrador')
const correoUsuario = ref(localStorage.getItem('correo_usuario') || 'admin@itca.edu.sv')
const rolUsuario = ref(localStorage.getItem('rol_usuario') || 'Administrador')

// Calcula automáticamente las iniciales (ej. "Cristian Campos" -> "CC")
const inicialesUsuario = computed(() => {
    const palabras = nombreUsuario.value.trim().split(' ').filter(Boolean)
    if (palabras.length >= 2) {
        return (palabras[0][0] + palabras[1][0]).toUpperCase()
    }
    return nombreUsuario.value.substring(0, 2).toUpperCase()
})

// Obtiene las quejas recientes de la API de Render
const cargarNotificaciones = async () => {
    try {
        const token = localStorage.getItem('token_sesion')
        const tipoToken = localStorage.getItem('tipo_token') || 'Bearer'

        const respuesta = await fetch('https://itca-quejas-api.onrender.com/api/reportes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${tipoToken} ${token}`
            }
        })

        if (respuesta.ok) {
            const resultado = await respuesta.json()
            const lista = resultado.data || resultado || []
            // Se invierte para mostrar las últimas quejas ingresadas primero
            notificaciones.value = Array.isArray(lista) ? [...lista].reverse() : []
        }
    } catch (error) {
        console.error('Error al cargar notificaciones:', error)
    }
}

// Limpia el localStorage y redirige al login
const cerrarSesion = () => {
    localStorage.removeItem('token_sesion')
    localStorage.removeItem('creador_id')
    localStorage.removeItem('tipo_token')
    localStorage.removeItem('nombre_usuario')
    localStorage.removeItem('correo_usuario')
    localStorage.removeItem('rol_usuario')

    router.push({ name: 'login' })
}

onMounted(() => {
    cargarNotificaciones()
})
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

    .perfil-hover {
        transition: background-color 0.2s ease;
    }

    .perfil-hover:hover {
        background-color: rgba(201, 162, 39, 0.12);
    }
</style>