<template>
    <div class="metrics-container">
        <!-- Encabezado de la vista -->
        <div class="header-section">
            <div>
                <h1 class="page-title">Métricas de mantenimiento</h1>
                <p class="page-subtitle">Analiza las incidencias del campus y el desempeño de su atención.</p>
            </div>
            <v-btn color="primary" prepend-icon="mdi-download" class="text-none rounded-lg px-4" elevation="0">
                Exportar informe
            </v-btn>
        </div>

        <!-- Barra de Filtros e Información -->
        <div class="filters-row mb-6">
            <div class="d-flex align-center gap-3">
                <select class="custom-select">
                    <option>Octubre de 2026</option>
                </select>
                <select class="custom-select">
                    <option>Todo el campus</option>
                </select>
            </div>
            <span class="info-meta">
                Datos del 1 al 16 de octubre · 128 reportes registrados
            </span>
        </div>

        <!-- Tarjetas KPI Superiores -->
        <div class="kpi-grid mb-6">
            <!-- KPI 1: Reportes Activos -->
            <v-card class="kpi-card pa-4" variant="outlined">
                <div class="d-flex justify-space-between align-start mb-2">
                    <span class="card-label">Reportes Activos</span>
                    <v-avatar color="blue-lighten-5" size="32" rounded="lg">
                        <v-icon icon="mdi-calendar-outline" color="primary" size="18"></v-icon>
                    </v-avatar>
                </div>
                <div class="d-flex align-baseline gap-2 mb-1">
                    <span class="kpi-value">62</span>
                    <span class="kpi-subtext">de 128 registrados</span>
                </div>
                <div class="kpi-subtext">
                    24 pendientes · 38 en proceso
                </div>
            </v-card>

            <!-- KPI 2: Tiempo Promedio -->
            <v-card class="kpi-card pa-4" variant="outlined">
                <div class="d-flex justify-space-between align-start mb-2">
                    <span class="card-label">Tiempo Promedio de Resolución</span>
                    <v-avatar color="blue-lighten-5" size="32" rounded="lg">
                        <v-icon icon="mdi-clock-outline" color="primary" size="18"></v-icon>
                    </v-avatar>
                </div>
                <div class="d-flex align-baseline gap-2 mb-1">
                    <span class="kpi-value">2,4</span>
                    <span class="kpi-subtext">días</span>
                </div>
                <div class="text-caption text-success d-flex align-center gap-1 font-weight-medium">
                    <v-icon icon="mdi-trending-down" size="14"></v-icon>
                    0,6 días menos que en septiembre
                </div>
            </v-card>

            <!-- KPI 3: Fallas por Zona -->
            <v-card class="kpi-card pa-4" variant="outlined">
                <div class="d-flex justify-space-between align-start mb-2">
                    <span class="card-label">Fallas por Zona</span>
                    <v-avatar color="blue-lighten-5" size="32" rounded="lg">
                        <v-icon icon="mdi-map-marker-outline" color="primary" size="18"></v-icon>
                    </v-avatar>
                </div>
                <div class="d-flex align-baseline gap-2 mb-1">
                    <span class="kpi-value">80</span>
                    <span class="kpi-subtext">en zona académica</span>
                </div>
                <div class="kpi-subtext">
                    62.5% del total · zona con más incidencias
                </div>
            </v-card>
        </div>

        <!-- Sección Central de Gráficas (2 Columnas) -->
        <div class="charts-grid mb-6">
            <!-- Columna Izquierda: Frecuencia por Edificio -->
            <v-card class="chart-card pa-5" variant="outlined">
                <h2 class="card-title">Frecuencia de fallas por edificio</h2>
                <p class="card-subtitle mb-4">Reportes registrados durante el periodo seleccionado</p>

                <div class="d-flex align-center gap-2 mb-4 chart-legend">
                    <span class="legend-box bg-primary"></span>
                    <span>Número de reportes</span>
                </div>

                <!-- Gráfico de Barras -->
                <div class="bar-chart-container">
                    <div class="chart-y-axis">
                        <span>40</span>
                        <span>30</span>
                        <span>20</span>
                        <span>10</span>
                        <span>0</span>
                    </div>
                    <div class="chart-bars-area">
                        <div class="bar-group">
                            <span class="bar-val">32</span>
                            <div class="bar" style="height: 80%;"></div>
                            <span class="bar-label">Ingeniería</span>
                        </div>
                        <div class="bar-group">
                            <span class="bar-val">28</span>
                            <div class="bar" style="height: 70%;"></div>
                            <span class="bar-label">Ciencias</span>
                        </div>
                        <div class="bar-group">
                            <span class="bar-val">22</span>
                            <div class="bar" style="height: 55%;"></div>
                            <span class="bar-label">Humanidades</span>
                        </div>
                        <div class="bar-group">
                            <span class="bar-val">18</span>
                            <div class="bar" style="height: 45%;"></div>
                            <span class="bar-label">Biblioteca</span>
                        </div>
                        <div class="bar-group">
                            <span class="bar-val">16</span>
                            <div class="bar" style="height: 40%;"></div>
                            <span class="bar-label">Administrativo</span>
                        </div>
                        <div class="bar-group">
                            <span class="bar-val">14</span>
                            <div class="bar" style="height: 35%;"></div>
                            <span class="bar-label">Deportivo</span>
                        </div>
                    </div>
                </div>

                <div class="card-footer-text mt-4">
                    Ingeniería concentra el 25 % de las fallas del campus.
                </div>
            </v-card>

            <!-- Columna Derecha: Fallas por Categoría -->
            <v-card class="chart-card pa-5" variant="outlined">
                <h2 class="card-title">Fallas por categoría</h2>
                <p class="card-subtitle mb-4">Distribución de 128 reportes</p>

                <!-- Gráfico Donut -->
                <div class="donut-container">
                    <div class="donut-chart">
                        <div class="donut-inner">
                            <span class="donut-number">128</span>
                            <span class="donut-label">reportes totales</span>
                        </div>
                    </div>
                </div>

                <!-- Leyenda de Categorías -->
                <div class="category-legend-list mt-4">
                    <div class="legend-item">
                        <div class="d-flex align-center gap-2">
                            <span class="legend-dot bg-blue-darken-2"></span>
                            <span class="legend-text">Infraestructura</span>
                        </div>
                        <div class="d-flex align-center gap-3">
                            <span class="legend-val">64</span>
                            <span class="legend-pct">50 %</span>
                        </div>
                    </div>

                    <div class="legend-item">
                        <div class="d-flex align-center gap-2">
                            <span class="legend-dot bg-blue-lighten-1"></span>
                            <span class="legend-text">Equipo</span>
                        </div>
                        <div class="d-flex align-center gap-3">
                            <span class="legend-val">40</span>
                            <span class="legend-pct">31,3 %</span>
                        </div>
                    </div>

                    <div class="legend-item">
                        <div class="d-flex align-center gap-2">
                            <span class="legend-dot bg-blue-lighten-3"></span>
                            <span class="legend-text">Limpieza</span>
                        </div>
                        <div class="d-flex align-center gap-3">
                            <span class="legend-val">24</span>
                            <span class="legend-pct">18,7 %</span>
                        </div>
                    </div>
                </div>

                <div class="card-footer-text mt-4">
                    Cada reporte pertenece a una única categoría.
                </div>
            </v-card>
        </div>

        <!-- Sección Inferior: Distribución por Zona -->
        <v-card class="pa-5 mb-4 zone-card" variant="outlined">
            <div class="d-flex justify-space-between align-center mb-4">
                <h2 class="card-title">Distribución por zona</h2>
                <span class="info-meta">6 edificios · 3 zonas del campus</span>
            </div>

            <div class="zones-grid">
                <!-- Zona 1 -->
                <div class="zone-item">
                    <div class="d-flex justify-space-between align-center mb-1">
                        <span class="zone-name">Académica</span>
                        <span class="zone-stats">80 reportes · 62,5 %</span>
                    </div>
                    <v-progress-linear color="blue-darken-2" model-value="62.5" height="6" rounded
                        class="mb-1"></v-progress-linear>
                    <span class="zone-sub">Ingeniería, Ciencias y Humanidades</span>
                </div>

                <!-- Zona 2 -->
                <div class="zone-item">
                    <div class="d-flex justify-space-between align-center mb-1">
                        <span class="zone-name">Servicios</span>
                        <span class="zone-stats">32 reportes · 25 %</span>
                    </div>
                    <v-progress-linear color="blue-lighten-1" model-value="25" height="6" rounded
                        class="mb-1"></v-progress-linear>
                    <span class="zone-sub">Biblioteca y Centro Deportivo</span>
                </div>

                <!-- Zona 3 -->
                <div class="zone-item">
                    <div class="d-flex justify-space-between align-center mb-1">
                        <span class="zone-name">Administrativa</span>
                        <span class="zone-stats">16 reportes · 12,5 %</span>
                    </div>
                    <v-progress-linear color="blue-lighten-3" model-value="12.5" height="6" rounded
                        class="mb-1"></v-progress-linear>
                    <span class="zone-sub">Edificio Administrativo</span>
                </div>
            </div>
        </v-card>

        <!-- Pie de página con Timestamp -->
        <div class="d-flex justify-space-between footer-meta px-1">
            <div class="d-flex align-center gap-1">
                <v-icon icon="mdi-refresh" size="14"></v-icon>
                <span>Última actualización: 16 de octubre de 2026, 10:00 h</span>
            </div>
            <span>Tiempo promedio calculado sobre 66 reportes resueltos</span>
        </div>
    </div>
</template>

<style scoped>
    .metrics-container {
        width: 100%;
        padding: 1.5rem 2rem;
        box-sizing: border-box;
    }

    /* Reglas estrictas para forzar colores oscuros en textos */
    .page-title,
    .card-title,
    .kpi-value,
    .donut-number,
    .bar-val,
    .legend-val,
    .zone-name,
    .zone-stats {
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
    .info-meta,
    .card-footer-text,
    .donut-label,
    .chart-legend,
    .legend-text,
    .legend-pct,
    .zone-sub,
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

    .kpi-subtext {
        font-size: 0.75rem;
    }

    .info-meta,
    .footer-meta {
        font-size: 0.75rem;
    }

    .card-footer-text {
        font-size: 0.75rem;
    }

    .header-section {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1.25rem;
    }

    .filters-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .custom-select {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 0.4rem 1rem;
        font-size: 0.85rem;
        color: #0f172a !important;
        outline: none;
        cursor: pointer;
    }

    .kpi-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
    }

    .kpi-card,
    .chart-card,
    .zone-card {
        background-color: #ffffff !important;
        border-color: #e2e8f0 !important;
        border-radius: 12px !important;
    }

    .charts-grid {
        display: grid;
        grid-template-columns: 1.8fr 1.2fr;
        gap: 1.25rem;
    }

    /* Gráfico de Barras CSS */
    .bar-chart-container {
        display: flex;
        height: 200px;
        margin-top: 1rem;
        border-bottom: 1px solid #e2e8f0;
        position: relative;
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
        width: 40px;
        position: relative;
    }

    .bar-val {
        font-size: 0.75rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }

    .bar {
        width: 100%;
        background-color: #3b82f6;
        border-radius: 4px 4px 0 0;
    }

    .bar-label {
        font-size: 0.7rem;
        margin-top: 0.5rem;
        position: absolute;
        bottom: -22px;
        white-space: nowrap;
    }

    .legend-box {
        width: 10px;
        height: 10px;
        border-radius: 2px;
        display: inline-block;
    }

    /* Gráfico Donut CSS */
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
        background: conic-gradient(#1d4ed8 0% 50%, #60a5fa 50% 81.3%, #93c5fd 81.3% 100%);
        display: flex;
        justify-content: center;
        align-items: center;
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

    /* Rejilla de Zonas */
    .zones-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }

    .zone-name {
        font-size: 0.8rem;
        font-weight: 600;
    }

    .zone-stats {
        font-size: 0.8rem;
        font-weight: 700;
    }

    .zone-sub {
        font-size: 0.75rem;
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
</style>
<script>
    export default {
        name: 'MetricasView'
    }
</script>
