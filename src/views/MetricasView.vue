<template>
    <div class="metrics-container">
        <!-- Encabezado de la vista -->
        <div class="header-section">
            <div>
                <h1 class="page-title">Métricas de mantenimiento</h1>
                <p class="page-subtitle">Analiza las incidencias del campus y el desempeño de su atención.</p>
            </div>
            <div class="d-flex flex-wrap ga-2">
                <v-btn color="primary" variant="tonal" prepend-icon="mdi-refresh"
                    class="text-none rounded-lg px-4 print-hide" elevation="0" :loading="cargando"
                    :disabled="cargando" @click="recargarMetricas">
                    Actualizar datos
                </v-btn>
                <v-btn color="primary" prepend-icon="mdi-download" class="text-none rounded-lg px-4 print-hide"
                    elevation="0" :loading="exportando" @click="exportarInforme">
                    Exportar informe
                </v-btn>
            </div>
        </div>

        <!-- Estado de Carga / Error -->
        <div v-if="cargando && !solicitudes.length" class="text-center py-8">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <p class="text-caption text-grey-darken-1 mt-2">Cargando métricas desde la API...</p>
        </div>

        <v-alert v-if="error" type="error" variant="tonal" class="mb-6">
            {{ error }}
        </v-alert>

        <template v-if="!cargando || solicitudes.length">
            <!-- Tarjeta KPI: Reportes Activos -->
            <div class="kpi-grid mb-6">
                <v-card class="kpi-card pa-4" variant="outlined">
                    <div class="d-flex justify-space-between align-start mb-2">
                        <span class="card-label">Reportes Activos</span>
                        <v-avatar color="blue-lighten-5" size="32" rounded="lg">
                            <v-icon icon="mdi-calendar-outline" color="primary" size="18"></v-icon>
                        </v-avatar>
                    </div>
                    <div class="d-flex align-baseline gap-2 mb-1">
                        <span class="kpi-value">{{ totalActivos }}</span>
                        <span class="kpi-subtext">de {{ totalSolicitudes }} registrados</span>
                    </div>
                    <div class="kpi-subtext">
                        {{ totalPendientes }} pendientes · {{ totalEnProceso }} en proceso · {{ totalResueltos }}
                        resueltos
                    </div>
                </v-card>
            </div>

            <!-- Sección Principal de Gráficos -->
            <div class="charts-grid mb-6">
                <!-- Columna Izquierda: Gráfico de Barras -->
                <v-card class="chart-card pa-5" variant="outlined">
                    <h2 class="card-title">Frecuencia de fallas por edificio</h2>
                    <p class="card-subtitle mb-3">Reportes registrados durante el periodo seleccionado</p>

                    <div class="d-flex align-center gap-2 mb-6 chart-legend">
                        <span class="legend-box bg-primary"></span>
                        <span>Número de reportes</span>
                    </div>

                    <div class="bar-chart-container">
                        <div class="chart-y-axis">
                            <span>{{ maxFallasEdificio }}</span>
                            <span>{{ Math.round(maxFallasEdificio * 0.75) }}</span>
                            <span>{{ Math.round(maxFallasEdificio * 0.5) }}</span>
                            <span>{{ Math.round(maxFallasEdificio * 0.25) }}</span>
                            <span>0</span>
                        </div>

                        <div class="chart-bars-area">
                            <div v-if="fallasPorEdificio.length === 0"
                                class="w-100 text-center text-caption text-grey py-8">
                                Sin datos de edificios registrados
                            </div>
                            <template v-else>
                                <div v-for="item in fallasPorEdificio" :key="item.edificio" class="bar-group">
                                    <span class="bar-val">{{ item.total }}</span>
                                    <div class="bar" :style="{ height: calcularAlturaBarra(item.total ?? 0) }"
                                        :title="`${item.edificio}: ${item.total} reportes`"></div>
                                    <span class="bar-label">{{ item.edificio }}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </v-card>

                <!-- Columna Derecha: Gráfico de Dona -->
                <v-card class="chart-card pa-5" variant="outlined">
                    <h2 class="card-title">Fallas por categoría</h2>
                    <p class="card-subtitle mb-4">Distribución de {{ totalSolicitudes }} reportes</p>

                    <div class="donut-container mb-4">
                        <div class="donut-chart" :style="{ background: estiloGradientDona }">
                            <div class="donut-inner">
                                <span class="donut-number">{{ totalSolicitudes }}</span>
                                <span class="donut-label">reportes totales</span>
                            </div>
                        </div>
                    </div>

                    <div class="category-legend-list">
                        <div v-for="cat in fallasPorCategoria" :key="cat.nombre" class="legend-item">
                            <div class="d-flex align-center gap-2">
                                <span class="legend-dot" :style="{ backgroundColor: cat.color }"></span>
                                <span class="legend-text">{{ cat.nombre }}</span>
                            </div>
                            <div class="d-flex align-center gap-3">
                                <span class="legend-val">{{ cat.total }}</span>
                                <span class="legend-pct">{{ cat.porcentajeTexto }}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="card-footer-text mt-4">
                        Cada reporte pertenece a una única categoría.
                    </div>
                </v-card>
            </div>

            <!-- Pie de página -->
            <div class="d-flex justify-space-between footer-meta px-1">
                <div class="d-flex align-center gap-1">
                    <v-icon icon="mdi-refresh" size="14"></v-icon>
                    <span>Última actualización: {{ fechaActualizacion }}</span>
                </div>
                <span>Tiempo promedio calculado sobre {{ totalResueltos }} reportes resueltos</span>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import { useStore } from '../store'

    const store = useStore()

    const solicitudes = computed(() => store.state.solicitudes)
    const cargando = computed(() => store.state.cargando)
    const error = computed(() => store.state.error)
    const exportando = ref(false)
    const fechaActualizacion = computed(() => {
        const actualizadaEn = store.state.actualizadoEn
        if (!actualizadaEn) return 'Pendiente'

        const fecha = new Date(actualizadaEn)
        return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }) +
            `, ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')} h`
    })

    const exportarInforme = () => {
        exportando.value = true
        try {
            window.print()
        } finally {
            exportando.value = false
        }
    }

    const recargarMetricas = async () => {
        await store.dispatch('fetchSolicitudes')
    }

    onMounted(async () => {
        if (!solicitudes.value.length) {
            await recargarMetricas()
        }
    })

    // Métricas totales
    const totalSolicitudes = computed(() => solicitudes.value.length)

    const totalPendientes = computed(() =>
        solicitudes.value.filter(s => s.estado?.toLowerCase() === 'pendiente').length
    )

    const totalEnProceso = computed(() =>
        solicitudes.value.filter(s => s.estado?.toLowerCase() === 'en proceso').length
    )

    const totalActivos = computed(() => totalPendientes.value + totalEnProceso.value)

    const totalResueltos = computed(() =>
        solicitudes.value.filter(s => {
            const est = s.estado?.toLowerCase()
            return est === 'resuelto' || est === 'resuelta' || est === 'resueltas'
        }).length
    )

    // Fallas por edificio
    const fallasPorEdificio = computed(() => {
        const mapaEdificios: Record<string, number> = {}

        solicitudes.value.forEach(s => {
            if (!s.ubicacion_exacta) return
            const edificio = s.ubicacion_exacta.split('-')[0].trim() || 'Otros'
            mapaEdificios[edificio] = (mapaEdificios[edificio] || 0) + 1
        })

        return Object.keys(mapaEdificios)
            .map(edificio => ({ edificio, total: mapaEdificios[edificio] ?? 0 }))
            .sort((a, b) => (b.total ?? 0) - (a.total ?? 0))
    })

    const maxFallasEdificio = computed(() => {
        if (fallasPorEdificio.value.length === 0) return 40
        const max = Math.max(...fallasPorEdificio.value.map(e => e.total))
        return max > 0 ? Math.ceil(max / 5) * 5 : 40
    })

    const calcularAlturaBarra = (val: number) => {
        if (maxFallasEdificio.value === 0) return '0%'
        const porcentaje = (val / maxFallasEdificio.value) * 100
        return `${Math.min(porcentaje, 100)}%`
    }

    // Fallas por categoría
    const coloresPaleta = ['#1d4ed8', '#3b82f6', '#93c5fd', '#60a5fa', '#a5f3fc']

    const fallasPorCategoria = computed(() => {
        const mapaCategorias: Record<string, number> = {}

        solicitudes.value.forEach(s => {
            const cat = s.categoria?.trim() || 'Sin Categoría'
            mapaCategorias[cat] = (mapaCategorias[cat] || 0) + 1
        })

        const total = totalSolicitudes.value || 1

        return Object.keys(mapaCategorias).map((nombre, i) => {
            const cant = mapaCategorias[nombre] ?? 0
            const porcentajeExacto = (cant / total) * 100
            return {
                nombre,
                total: cant,
                porcentajeExacto,
                porcentajeTexto: porcentajeExacto.toFixed(1),
                color: coloresPaleta[i % coloresPaleta.length]
            }
        })
    })

    const estiloGradientDona = computed(() => {
        if (fallasPorCategoria.value.length === 0) return '#e2e8f0'

        let acumulado = 0
        const tramos = fallasPorCategoria.value.map(c => {
            const inicio = acumulado
            acumulado += c.porcentajeExacto
            return `${c.color} ${inicio}% ${acumulado}%`
        })

        return `conic-gradient(${tramos.join(', ')})`
    })

</script>

<style scoped>
    .metrics-container {
        width: 100%;
        padding: 1.5rem 2rem;
        box-sizing: border-box;
    }

    .page-title,
    .card-title,
    .kpi-value,
    .donut-number,
    .bar-val,
    .legend-val {
        color: #0f172a !important;
    }

    .page-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
    }

    .card-title {
        font-size: 1rem;
        font-weight: 700;
        margin: 0;
    }

    .page-subtitle,
    .card-subtitle,
    .card-label,
    .kpi-subtext,
    .card-footer-text,
    .donut-label,
    .chart-legend,
    .legend-text,
    .legend-pct,
    .footer-meta,
    .bar-label,
    .chart-y-axis span {
        color: #64748b !important;
    }

    .page-subtitle {
        font-size: 0.85rem;
        margin-top: 0.25rem;
    }

    .card-subtitle {
        font-size: 0.75rem;
        margin-top: 0.2rem;
    }

    .card-label {
        font-size: 0.75rem;
        font-weight: 500;
    }

    .kpi-value {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1;
    }

    .kpi-subtext,
    .footer-meta,
    .card-footer-text {
        font-size: 0.75rem;
    }

    .header-section {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1.25rem;
    }

    .kpi-grid {
        display: grid;
        grid-template-columns: 320px;
    }

    .kpi-card,
    .chart-card {
        background-color: #ffffff !important;
        border-color: #e2e8f0 !important;
        border-radius: 12px !important;
    }

    .charts-grid {
        display: grid;
        grid-template-columns: 1.8fr 1.2fr;
        gap: 1.25rem;
    }

    /* Gráfico de Barras */
    .bar-chart-container {
        display: flex;
        height: 220px;
        margin-top: 1rem;
        border-bottom: 1px solid #e2e8f0;
        position: relative;
        padding-bottom: 1.75rem;
    }

    .chart-y-axis {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-right: 0.75rem;
        font-size: 0.75rem;
    }

    .chart-bars-area {
        display: flex;
        flex: 1;
        justify-content: space-around;
        align-items: flex-end;
        padding-left: 0.5rem;
    }

    .bar-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        justify-content: flex-end;
        min-width: 28px;
        position: relative;
    }

    .bar-val {
        font-size: 0.75rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }

    .bar {
        width: 100%;
        max-width: 38px;
        background-color: #3b82f6;
        border-radius: 4px 4px 0 0;
        transition: height 0.4s ease;
    }

    .bar-label {
        font-size: 0.7rem;
        margin-top: 0.5rem;
        position: absolute;
        bottom: -24px;
        white-space: nowrap;
    }

    .legend-box {
        width: 10px;
        height: 10px;
        border-radius: 2px;
        display: inline-block;
    }

    /* Gráfico Dona */
    .donut-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 0;
    }

    .donut-chart {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background 0.4s ease;
    }

    .donut-inner {
        width: 110px;
        height: 110px;
        background-color: #ffffff;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .donut-number {
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
    }

    .donut-label {
        font-size: 0.7rem;
    }

    .category-legend-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .legend-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .legend-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
    }

    .legend-val {
        font-size: 0.8rem;
        font-weight: 700;
    }

    .legend-pct {
        font-size: 0.8rem;
    }

    .gap-1 {
        gap: 0.25rem;
    }

    .gap-2 {
        gap: 0.5rem;
    }

    .gap-3 {
        gap: 0.75rem;
    }

    @media (max-width: 960px) {
        .charts-grid {
            grid-template-columns: 1fr;
        }
    }
</style>

<!-- Estilos globales para impresión / exportación a PDF -->
<style>
    @media print {
        * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        .v-navigation-drawer,
        .v-app-bar,
        .v-overlay-container,
        .print-hide,
        header,
        nav,
        aside,
        button {
            display: none !important;
        }

        html,
        body,
        .v-application,
        .v-main,
        .main-wrapper {
            background-color: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        .metrics-container {
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
        }

        .charts-grid {
            display: grid !important;
            grid-template-columns: 1.6fr 1.1fr !important;
            gap: 1rem !important;
            break-inside: avoid;
        }

        .chart-card,
        .kpi-card {
            border: 1px solid #cbd5e1 !important;
            box-shadow: none !important;
            break-inside: avoid;
        }

        .bar-chart-container {
            height: 180px !important;
            padding-bottom: 2rem !important;
        }

        .bar-label {
            font-size: 0.6rem !important;
            bottom: -26px !important;
        }

        .donut-chart {
            width: 130px !important;
            height: 130px !important;
        }

        .donut-inner {
            width: 90px !important;
            height: 90px !important;
        }
    }
</style>