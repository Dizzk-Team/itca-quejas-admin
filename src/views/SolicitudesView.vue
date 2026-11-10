<template>
    <div class="layout-container">
        <!-- Encabezado -->
        <div class="d-flex justify-space-between align-center mb-4">
            <div>
                <h1 class="text-h5 font-weight-bold text-slate-800">Gestión de Solicitudes</h1>
                <p class="text-caption text-grey-darken-1">
                    Supervisa, organiza y asigna los reportes de mantenimiento del campus.
                </p>
            </div>

        </div>

        <!-- Tarjetas KPI Informativas -->
        <div class="kpi-summary-grid mb-6">
            <!-- Tarjeta 1: Total Solicitudes -->
            <v-card class="summary-card pa-4" variant="outlined">
                <div class="d-flex justify-space-between align-start mb-2">
                    <span class="card-title-text">Solicitudes totales</span>
                    <v-avatar color="blue-lighten-5" size="34" rounded="lg">
                        <v-icon icon="mdi-file-document-outline" color="blue-darken-2" size="20"></v-icon>
                    </v-avatar>
                </div>
                <div class="card-number-val mb-1">{{ totalSolicitudes }}</div>
                <div class="card-sub-text">Registradas este mes</div>
            </v-card>

            <!-- Tarjeta 2: Pendientes -->
            <v-card class="summary-card pa-4" variant="outlined">
                <div class="d-flex justify-space-between align-start mb-2">
                    <span class="card-title-text">Pendientes</span>
                    <v-avatar color="amber-lighten-5" size="34" rounded="lg">
                        <v-icon icon="mdi-clock-outline" color="amber-darken-3" size="20"></v-icon>
                    </v-avatar>
                </div>
                <div class="card-number-val mb-1">{{ totalPendientes }}</div>
                <div class="card-sub-text">Por asignar a un técnico</div>
            </v-card>

            <!-- Tarjeta 3: En proceso -->
            <v-card class="summary-card pa-4" variant="outlined">
                <div class="d-flex justify-space-between align-start mb-2">
                    <span class="card-title-text">En proceso</span>
                    <v-avatar color="light-blue-lighten-5" size="34" rounded="lg">
                        <v-icon icon="mdi-wrench-outline" color="light-blue-darken-2" size="20"></v-icon>
                    </v-avatar>
                </div>
                <div class="card-number-val mb-1">{{ totalEnProceso }}</div>
                <div class="card-sub-text">Con atención en curso</div>
            </v-card>

            <!-- Tarjeta 4: Resueltas -->
            <v-card class="summary-card pa-4" variant="outlined">
                <div class="d-flex justify-space-between align-start mb-2">
                    <span class="card-title-text">Resueltas</span>
                    <v-avatar color="green-lighten-5" size="34" rounded="lg">
                        <v-icon icon="mdi-check-circle-outline" color="green-darken-2" size="20"></v-icon>
                    </v-avatar>
                </div>
                <div class="card-number-val mb-1">{{ totalResueltas }}</div>
                <div class="card-sub-text">Intervenciones finalizadas</div>
            </v-card>
        </div>

        <!-- Filtros y Búsqueda -->
        <div class="d-flex gap-3 mb-6">
            <div class="search-input-wrapper flex-grow-1">
                <v-icon icon="mdi-magnify" class="search-icon" size="20"></v-icon>
                <input v-model="filtroTexto" type="text" placeholder="Buscar por creador, ubicación o descripción..." />
            </div>

            <select v-model="filtroEstado" class="custom-select">
                <option value="">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En proceso">En proceso</option>
                <option value="Resuelta">Resuelta</option>
            </select>

            <select v-model="filtroCategoria" class="custom-select">
                <option value="">Todas las categorías</option>
                <option value="Equipo">Equipo</option>
                <option value="Infraestructura">Infraestructura</option>
                <option value="Limpieza">Limpieza</option>
            </select>
        </div>

        <!-- Tabla -->
        <v-card class="pa-5 card-table" variant="outlined">
            <div class="d-flex justify-space-between align-center mb-4">
                <div class="d-flex align-center gap-2">
                    <h2 class="text-subtitle-1 font-weight-bold text-slate-800">Reportes de mantenimiento</h2>
                    <v-chip size="x-small" color="primary" class="font-weight-bold">
                        {{ solicitudesFiltradas.length }}
                    </v-chip>
                </div>
                <v-btn variant="outlined" size="small" prepend-icon="mdi-download" class="text-none">
                    Exportar
                </v-btn>
            </div>

            <!-- Estado Carga -->
            <div v-if="cargando" class="text-center py-8">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                <p class="text-caption text-grey-darken-1 mt-2">Cargando datos desde la API...</p>
            </div>

            <!-- Estado Error -->
            <v-alert v-else-if="error" type="error" variant="tonal" class="my-4">
                {{ error }}
            </v-alert>

            <!-- Tabla principal -->
            <div v-else class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>CREADOR ID</th>
                            <th>FECHA</th>
                            <th>UBICACIÓN EXACTA</th>
                            <th>DESCRIPCIÓN</th>
                            <th>CATEGORÍA</th>
                            <th>ESTADO</th>
                            <th class="text-center">EVIDENCIA</th>
                            <th class="text-center">ACCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="solicitudesFiltradas.length === 0">
                            <td colspan="8" class="text-center text-grey-darken-1 py-6">
                                No se encontraron registros que coincidan con la búsqueda.
                            </td>
                        </tr>
                        <tr v-for="item in solicitudesFiltradas" :key="item._id || item.id || item.creador_id">
                            <td class="font-weight-bold text-primary text-mono">
                                {{ acortarId(item.creador_id) }}
                            </td>
                            <td>{{ formatearFecha(item.created_at) }}</td>
                            <td>{{ item.ubicacion_exacta }}</td>
                            <td class="col-descripcion">{{ item.descripcion }}</td>
                            <td>
                                <span class="category-tag">{{ item.categoria }}</span>
                            </td>
                            <td>
                                <span class="badge-status" :class="claseEstado(item.estado)">
                                    ● {{ item.estado }}
                                </span>
                            </td>
                            <!-- Columna EVIDENCIA en la tabla -->
                            <td class="text-center">
                                <template v-if="obtenerUrlImagen(item.evidencias_url)">
                                    <v-img :src="obtenerUrlImagen(item.evidencias_url)!" alt="Evidencia" width="42"
                                        height="42" cover class="evidence-thumb mx-auto rounded-lg"
                                        @click="verImagen(obtenerUrlImagen(item.evidencias_url)!)">
                                        <template #placeholder>
                                            <div
                                                class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
                                                <v-progress-circular indeterminate size="14"
                                                    color="primary"></v-progress-circular>
                                            </div>
                                        </template>
                                        <template #error>
                                            <!-- Permite hacer clic aunque falle la miniatura para abrir la URL original -->
                                            <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3 cursor-pointer"
                                                title="Abrir URL de evidencia"
                                                @click="verImagen(obtenerUrlImagen(item.evidencias_url)!)">
                                                <v-icon icon="mdi-image-broken-variant" color="warning"
                                                    size="18"></v-icon>
                                            </div>
                                        </template>
                                    </v-img>
                                </template>
                                <span v-else class="text-caption text-grey-lighten-1">-</span>
                            </td>
                            <td class="text-center">
                                <v-btn variant="outlined" size="x-small" color="slate-700" class="text-none">
                                    Asignar
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </v-card>
        <!-- Modal para previsualizar o inspeccionar la URL -->
        <v-dialog v-model="dialogImagen" max-width="700">
            <v-card class="pa-4 rounded-lg">
                <div class="d-flex justify-space-between align-center mb-3">
                    <span class="text-subtitle-1 font-weight-bold text-slate-800">Evidencia adjunta</span>
                    <v-btn icon="mdi-close" variant="text" size="small" @click="dialogImagen = false"></v-btn>
                </div>

                <div class="d-flex justify-center align-center bg-grey-lighten-4 rounded-lg pa-4 mb-3">
                    <img :src="imagenSeleccionada" alt="Evidencia" class="modal-preview-img" />
                </div>

                <div class="d-flex justify-end">
                    <v-btn :href="imagenSeleccionada" target="_blank" color="primary" variant="tonal"
                        prepend-icon="mdi-open-in-new" size="small" class="text-none">
                        Abrir enlace directo
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import { useStore } from '../store'

    const store = useStore()

    const filtroTexto = ref('')
    const filtroEstado = ref('')
    const filtroCategoria = ref('')

    const solicitudes = computed(() => store.state.solicitudes)
    const cargando = computed(() => store.state.cargando)
    const error = computed(() => store.state.error)

    // Variables reactivas para el modal de imágenes
    const dialogImagen = ref(false)
    const imagenSeleccionada = ref('')

    const verImagen = (url: string) => {
        imagenSeleccionada.value = url
        dialogImagen.value = true
    }

    // Extrae la URL válida ya sea si la API envía un Array o un String
    const obtenerUrlImagen = (evidencia: any): string | null => {
        if (!evidencia) return null
        if (Array.isArray(evidencia) && evidencia.length > 0) return evidencia[0]
        if (typeof evidencia === 'string' && evidencia.trim() !== '') return evidencia
        return null
    }

    // Conteos dinámicos calculados desde el array de solicitudes de Vuex
    const totalSolicitudes = computed(() => solicitudes.value.length)

    const totalPendientes = computed(() =>
        solicitudes.value.filter(s => s.estado?.toLowerCase() === 'pendiente').length
    )

    const totalEnProceso = computed(() =>
        solicitudes.value.filter(s => s.estado?.toLowerCase() === 'en proceso').length
    )

    const totalResueltas = computed(() =>
        solicitudes.value.filter(s =>
            s.estado?.toLowerCase() === 'resuelta' || s.estado?.toLowerCase() === 'resueltas'
        ).length
    )

    onMounted(() => {
        store.dispatch('fetchSolicitudes')
    })

    // Filtrado reactivo por texto (creador, ubicación, descripción), estado y categoría
    const solicitudesFiltradas = computed(() => {
        return solicitudes.value.filter(s => {
            const texto = filtroTexto.value.toLowerCase()
            const coincideTexto =
                (s.creador_id && s.creador_id.toLowerCase().includes(texto)) ||
                (s.ubicacion_exacta && s.ubicacion_exacta.toLowerCase().includes(texto)) ||
                (s.descripcion && s.descripcion.toLowerCase().includes(texto))

            const coincideEstado = !filtroEstado.value || s.estado === filtroEstado.value
            const coincideCategoria = !filtroCategoria.value || s.categoria === filtroCategoria.value

            return coincideTexto && coincideEstado && coincideCategoria
        })
    })

    // Formatea timestamps ISO tipo "2026-11-05T04:12:39.025000Z" a "05 nov 2026, 04:12 h"
    const formatearFecha = (fechaStr: string) => {
        if (!fechaStr) return '-'
        const fecha = new Date(fechaStr)
        return fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }) + ` ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')} h`
    }

    // Muestra los primeros 8 caracteres del creador_id para evitar sobrecargar la tabla
    const acortarId = (id: string) => {
        if (!id) return '-'
        return id.length > 10 ? `${id.substring(0, 8)}...` : id
    }

    const claseEstado = (estado: string) => {
        switch (estado) {
            case 'Pendiente':
                return 'badge-pendiente'
            case 'En proceso':
                return 'badge-proceso'
            case 'Resuelta':
                return 'badge-resuelta'
            default:
                return ''
        }
    }
</script>

<style scoped>
    .layout-container {
        width: 100%;
        padding: 1.5rem 2rem;
        box-sizing: border-box;
    }

    .text-slate-800 {
        color: #0f172a !important;
    }

    .card-table {
        background-color: #ffffff !important;
        border-color: #e2e8f0 !important;
        border-radius: 12px !important;
    }

    .search-input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .search-icon {
        position: absolute;
        left: 0.75rem;
        color: #64748b;
    }

    .search-input-wrapper input {
        width: 100%;
        padding: 0.5rem 0.75rem 0.5rem 2.4rem;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 0.85rem;
        background-color: #ffffff;
        color: #0f172a !important;
        outline: none;
    }

    .search-input-wrapper input::placeholder {
        color: #94a3b8;
    }

    .custom-select {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 0.4rem 1rem;
        font-size: 0.85rem;
        color: #0f172a !important;
        outline: none;
    }

    .table-responsive {
        width: 100%;
        overflow-x: auto;
    }

    .custom-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.85rem;
        text-align: left;
    }

    .custom-table th {
        padding: 0.75rem 1rem;
        color: #64748b;
        font-weight: 600;
        border-bottom: 1px solid #e2e8f0;
    }

    .custom-table td {
        padding: 0.85rem 1rem;
        color: #334155;
        border-bottom: 1px solid #f1f5f9;
    }

    .col-descripcion {
        max-width: 280px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .text-mono {
        font-family: monospace;
    }

    .category-tag {
        background-color: #f1f5f9;
        color: #475569;
        padding: 0.2rem 0.5rem;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .badge-status {
        padding: 0.25rem 0.6rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        display: inline-block;
    }

    .badge-pendiente {
        background-color: #fef3c7;
        color: #d97706;
    }

    .badge-proceso {
        background-color: #e0f2fe;
        color: #0284c7;
    }

    .badge-resuelta {
        background-color: #dcfce7;
        color: #15803d;
    }

    .gap-2 {
        gap: 0.5rem;
    }

    .gap-3 {
        gap: 0.75rem;
    }

    .evidence-thumb {
        cursor: pointer;
        border: 1px solid #e2e8f0;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .evidence-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    .modal-preview-img {
        max-width: 100%;
        max-height: 75vh;
        object-fit: contain;
        border-radius: 6px;
    }

    /* Rejilla responsiva de 4 columnas */
    .kpi-summary-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.25rem;
    }

    .summary-card {
        background-color: #ffffff !important;
        border-color: #e2e8f0 !important;
        border-radius: 12px !important;
        box-shadow: none !important;
    }

    .card-title-text {
        font-size: 0.8rem;
        font-weight: 500;
        color: #64748b !important;
    }

    .card-number-val {
        font-size: 1.75rem;
        font-weight: 700;
        color: #0f172a !important;
        line-height: 1.1;
    }

    .card-sub-text {
        font-size: 0.75rem;
        color: #94a3b8 !important;
    }

    /* Adaptación para pantallas pequeñas */
    @media (max-width: 960px) {
        .kpi-summary-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 600px) {
        .kpi-summary-grid {
            grid-template-columns: 1fr;
        }
    }
</style>