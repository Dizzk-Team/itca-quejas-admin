<template>
    <div class="metrics-container">
        <!-- Encabezado de la vista -->
        <!-- Encabezado de la vista -->
        <div class="header-section">
            <div>
                <h1 class="page-title">Métricas de mantenimiento</h1>
                <p class="page-subtitle">Analiza las incidencias del campus y el desempeño de su atención.</p>
            </div>
            <v-btn color="primary" prepend-icon="mdi-download" class="text-none rounded-lg px-4 print-hide"
                elevation="0" :loading="exportando" @click="exportarInforme">
                Exportar informe
            </v-btn>
        </div>

        <!-- Estado de Carga / Error si aplica -->
        <div v-if="cargando" class="text-center py-8">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <p class="text-caption text-grey-darken-1 mt-2">Cargando métricas desde la API...</p>
        </div>

        <v-alert v-else-if="error" type="error" variant="tonal" class="mb-6">
            {{ error }}
        </v-alert>

        <template v-else>
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
                        {{ totalPendientes }} pendientes · {{ totalEnProceso }} en proceso
                    </div>
                </v-card>
            </div>

            <!-- Sección Principal de Gráficos (2 Columnas) -->
            <div class="charts-grid mb-6">
                <!-- Columna Izquierda: Gráfico de Barras (Frecuencia por Edificio) -->
                <v-card class="chart-card pa-5" variant="outlined">
                    <h2 class="card-title">Frecuencia de fallas por edificio</h2>
                    <p class="card-subtitle mb-3">Reportes registrados durante el periodo seleccionado</p>

                    <div class="d-flex align-center gap-2 mb-6 chart-legend">
                        <span class="legend-box bg-primary"></span>
                        <span>Número de reportes</span>
                    </div>

                    <!-- Estructura del Gráfico de Barras -->
                    <div class="bar-chart-container">
                        <!-- Eje Y -->
                        <div class="chart-y-axis">
                            <span>{{ maxFallasEdificio }}</span>
                            <span>{{ Math.round(maxFallasEdificio * 0.75) }}</span>
                            <span>{{ Math.round(maxFallasEdificio * 0.5) }}</span>
                            <span>{{ Math.round(maxFallasEdificio * 0.25) }}</span>
                            <span>0</span>
                        </div>

                        <!-- Área de Barras dinámicas -->
                        <div class="chart-bars-area">
                            <div v-if="fallasPorEdificio.length === 0"
                                class="w-100 text-center text-caption text-grey py-8">
                                Sin datos de edificios registrados
                            </div>
                            <div v-else v-for="(item, index) in fallasPorEdificio" :key="index" class="bar-group">
                                <span class="bar-val">{{ item.total }}</span>
                                <div class="bar" :style="{ height: calcularAlturaBarra(item.total) }"
                                    :title="`${item.edificio}: ${item.total} reportes`"></div>
                                <span class="bar-label">{{ item.edificio }}</span>
                            </div>
                        </div>
                    </div>
                </v-card>

                <!-- Columna Derecha: Gráfico de Dona / Pastel (Fallas por Categoría) -->
                <v-card class="chart-card pa-5" variant="outlined">
                    <h2 class="card-title">Fallas por categoría</h2>
                    <p class="card-subtitle mb-4">Distribución de {{ totalSolicitudes }} reportes</p>

                    <!-- Gráfico de Dona en CSS SVG Dinámico -->
                    <div class="donut-container mb-4">
                        <div class="donut-chart" :style="{ background: estiloGradientDona }">
                            <div class="donut-inner">
                                <span class="donut-number">{{ totalSolicitudes }}</span>
                                <span class="donut-label">reportes totales</span>
                            </div>
                        </div>
                    </div>

                    <!-- Leyenda con Valores y Porcentajes por Categoría -->
                    <div class="category-legend-list">
                        <div v-for="(cat, index) in fallasPorCategoria" :key="index" class="legend-item">
                            <div class="d-flex align-center gap-2">
                                <span class="legend-dot" :style="{ backgroundColor: cat.color }"></span>
                                <span class="legend-text">{{ cat.nombre }}</span>
                            </div>
                            <div class="d-flex align-center gap-3">
                                <span class="legend-val">{{ cat.total }}</span>
                                <span class="legend-pct">{{ cat.porcentaje }}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="card-footer-text mt-4">
                        Cada reporte pertenece a una única categoría.
                    </div>
                </v-card>
            </div>

            <!-- Pie de página con timestamp -->
            <div class="d-flex justify-space-between footer-meta px-1">
                <div class="d-flex align-center gap-1">
                    <v-icon icon="mdi-refresh" size="14"></v-icon>
                    <span>Última actualización: {{ fechaActualizacion }}</span>
                </div>
                <span>Tiempo promedio calculado sobre {{ totalResueltas }} reportes resueltos</span>
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
    // Función principal para exportar el informe
    const exportarInforme = () => {
        exportando.value = true

        try {
            // Opción 1: Disparar el diálogo nativo de impresión / Guardar como PDF
            window.print()

            /* 
            // Opción 2 (Alternativa): Descargar un archivo CSV estructurado con las métricas
            exportarCSV() 
            */
        } catch (e) {
            console.error('Error al generar el informe:', e)
        } finally {
            exportando.value = false
        }
    }

    // Método opcional si prefieres descargar los datos consolidados en Excel / CSV
    const exportarCSV = () => {
        let contenidoCSV = 'Categoría/Edificio,Cantidad,Porcentaje\n'

        // Agregar datos de categorías
        contenidoCSV += '\n--- FALLAS POR CATEGORÍA ---\n'
        fallasPorCategoria.value.forEach(cat => {
            contenidoCSV += `"${cat.nombre}",${cat.total},${cat.porcentaje}%\n`
        })

        // Agregar datos de edificios
        contenidoCSV += '\n--- FALLAS POR EDIFICIO ---\n'
        fallasPorEdificio.value.forEach(ed => {
            contenidoCSV += `"${ed.edificio}",${ed.total}\n`
        })

        // Crear enlace de descarga automática
        const blob = new Blob(['\ufeff' + contenidoCSV], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', `Informe_Metricas_ITCA_${new Date().toISOString().slice(0, 10)}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }


    // Dispara la carga si la store está vacía al entrar a la vista
    onMounted(() => {
        if (!solicitudes.value.length) {
            store.dispatch('fetchSolicitudes')
        }
    })

    // 1. Métricas Totales
    const totalSolicitudes = computed(() => solicitudes.value.length)

    const totalPendientes = computed(() =>
        solicitudes.value.filter(s => s.estado?.toLowerCase() === 'pendiente').length
    )

    const totalEnProceso = computed(() =>
        solicitudes.value.filter(s => s.estado?.toLowerCase() === 'en proceso').length
    )

    const totalActivos = computed(() => totalPendientes.value + totalEnProceso.value)

    const totalResueltas = computed(() =>
        solicitudes.value.filter(s =>
            s.estado?.toLowerCase() === 'resuelta' || s.estado?.toLowerCase() === 'resueltas'
        ).length
    )

    // 2. Procesamiento Dinámico de Fallas por Edificio
    const fallasPorEdificio = computed(() => {
        const mapaEdificios: Record<string, number> = {}

        solicitudes.value.forEach(s => {
            if (!s.ubicacion_exacta) return
            // Extrae "Edificio X" dividiendo por el guión o tomando los dos primeros términos
            let edificio = s.ubicacion_exacta.split('-')[0].trim()
            if (!edificio) edificio = 'Otros'

            mapaEdificios[edificio] = (mapaEdificios[edificio] || 0) + 1
        })

        // Retorna arreglo ordenado descendentemente por cantidad de reportes
        return Object.keys(mapaEdificios)
            .map(edificio => ({ edificio, total: mapaEdificios[edificio] }))
            .sort((a, b) => b.total - a.total)
    })

    // Calcula la cota máxima del eje Y para normalizar la altura de las barras
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

    // 3. Procesamiento Dinámico de Fallas por Categoría
    const coloresPaleta = ['#1d4ed8', '#3b82f6', '#93c5fd', '#60a5fa', '#a5f3fc']

    const fallasPorCategoria = computed(() => {
        const mapaCategorias: Record<string, number> = {}

        solicitudes.value.forEach(s => {
            const cat = s.categoria?.trim() || 'Sin Categoría'
            mapaCategorias[cat] = (mapaCategorias[cat] || 0) + 1
        })

        const total = totalSolicitudes.value || 1

        return Object.keys(mapaCategorias).map((nombre, i) => {
            const cant = mapaCategorias[nombre]
            return {
                nombre,
                total: cant,
                porcentaje: ((cant / total) * 100).toFixed(1),
                color: coloresPaleta[i % coloresPaleta.length]
            }
        })
    })

    // Genera el fondo del gráfico de dona con conic-gradient dinámico
    const estiloGradientDona = computed(() => {
        if (fallasPorCategoria.value.length === 0) {
            return '#e2e8f0'
        }

        let acumulado = 0
        const tramos = fallasPorCategoria.value.map(c => {
            const inicio = acumulado
            acumulado += parseFloat(c.porcentaje)
            return `${c.color} ${inicio}% ${acumulado}%`
        })

        return `conic-gradient(${tramos.join(', ')})`
    })

    // Timestamp de última actualización
    const fechaActualizacion = ref(
        new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }) +
        `, ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')} h`
    )
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
        gap: 1.25rem;
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

    /* Ocultar elementos de navegación e interfaz durante la generación del PDF/Impresión */
    @media print {

        /* Ocultar sidebar, appbar y botones */
        .v-navigation-drawer,
        .v-app-bar,
        .print-hide,
        button {
            display: none !important;
        }

        /* Expandir el contenedor de métricas a todo el ancho */
        .metrics-container {
            padding: 0 !important;
            width: 100% !important;
            background-color: #ffffff !important;
        }

        /* Forzar que los gráficos y tarjetas no se corten entre páginas */
        .kpi-card,
        .chart-card {
            break-inside: avoid;
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
        }

        .charts-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 1rem !important;
        }
    }

</style>

<!-- Agrega este segundo bloque al final de MetricasView.vue (SIN 'scoped') -->
<style>
    @media print {

        /* 1. Forzar al navegador a imprimir todos los colores de fondo, barras y degradados de las gráficas */
        * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
        }

        /* 2. Ocultar totalmente la barra superior, el menú lateral y los botones */
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

        /* 3. Limpiar los márgenes y fondos de la aplicación global */
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

        /* 4. Ajustes del layout para encajar en una sola página sin desbordar etiquetas */
        .charts-grid {
            display: grid !important;
            grid-template-columns: 1.6fr 1.1fr !important;
            gap: 1rem !important;
            page-break-inside: avoid;
        }

        .chart-card,
        .kpi-card {
            border: 1px solid #cbd5e1 !important;
            box-shadow: none !important;
            page-break-inside: avoid;
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