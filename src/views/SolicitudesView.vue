<template>
    <div class="layout-container">
        <!-- Sidebar / Menú Lateral 
        <aside class="sidebar">
            <div class="brand">
                <div class="logo-box">ITCA-FEPADE</div>
            </div>

            <div class="nav-section">
                <span class="section-title">ADMINISTRACIÓN</span>
                <nav class="nav-menu">
                    <a href="#" class="nav-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                        </svg>
                        Inicio
                    </a>
                    <a href="#" class="nav-item active">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                        Gestión de Solicitudes
                        <span class="active-indicator"></span>
                    </a>
                    <a href="#" class="nav-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="20" x2="18" y2="10" />
                            <line x1="12" y1="20" x2="12" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                        Métricas
                    </a>
                </nav>
            </div>

            <div class="sidebar-footer">
                <div class="info-card">
                    <div class="info-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
                        </svg>
                    </div>
                    <h4>Dirección de Infraestructura</h4>
                    <p>Cuidamos los espacios donde se construye el futuro.</p>
                </div>
                <span class="version-text">Sistema de mantenimiento - v2.4</span>
            </div>
        </aside>-->

        <!-- Contenido Principal -->
        <main class="main-content">
            <!-- Header Superior -->
            <header class="top-header">
                <div class="breadcrumb">
                    <span>Mantenimiento</span>
                    <span class="separator">&gt;</span>
                    <span class="current">Gestión de Solicitudes</span>
                </div>
            </header>

            <!-- Encabezado de Sección -->
            <section class="page-title-section">
                <div>
                    <h1>Gestión de Solicitudes</h1>
                    <p class="subtitle">Supervisa, organiza y asigna los reportes de mantenimiento del campus.</p>
                </div>
                <button class="btn-primary">
                    <span>+</span> Nueva solicitud
                </button>
            </section>

            <!-- Tarjetas de Estadísticas -->
            <section class="stats-grid">
                <div class="stat-card">
                    <div class="stat-info">
                        <span class="stat-title">Solicitudes totales</span>
                        <span class="stat-value">0</span>
                        <span class="stat-meta">Registradas este mes</span>
                    </div>
                    <div class="stat-icon-wrapper blue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-info">
                        <span class="stat-title">Pendientes</span>
                        <span class="stat-value">0</span>
                        <span class="stat-meta">Por asignar a un técnico</span>
                    </div>
                    <div class="stat-icon-wrapper yellow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-info">
                        <span class="stat-title">En proceso</span>
                        <span class="stat-value">0</span>
                        <span class="stat-meta">Con atención en curso</span>
                    </div>
                    <div class="stat-icon-wrapper info-blue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path
                                d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-info">
                        <span class="stat-title">Resueltas</span>
                        <span class="stat-value">0</span>
                        <span class="stat-meta">Intervenciones finalizadas</span>
                    </div>
                    <div class="stat-icon-wrapper green">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>
                </div>
            </section>

            <!-- Barra de Filtros -->
            <section class="filters-bar">
                <div class="search-input-wrapper">
                    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input type="text" placeholder="Buscar por ID, ubicación o problema..." />
                </div>

                <div class="select-group">
                    <div class="select-wrapper">
                        <label>Estado</label>
                        <select>
                            <option>Todos los estados</option>
                        </select>
                    </div>
                    <div class="select-wrapper">
                        <label>Categoría</label>
                        <select>
                            <option>Todas las categorías</option>
                        </select>
                    </div>
                    <div class="select-wrapper">
                        <label>Período</label>
                        <select>
                            <option>Octubre de 2026</option>
                        </select>
                    </div>
                </div>
            </section>

            <!-- Tabla de Reportes -->
            <section class="table-container">
                <div class="table-header">
                    <div>
                        <h2>Reportes de mantenimiento <span class="badge-count">128</span></h2>
                        <p class="table-subtitle">Consulta las solicitudes y coordina su atención.</p>
                    </div>
                    <button class="btn-secondary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Exportar
                    </button>
                </div>

                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha <span>↓</span></th>
                                <th>Ubicación</th>
                                <th>Problema</th>
                                <th>Estado</th>
                                <th class="text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="font-bold text-blue">SOL-0128</td>
                                <td>
                                    <div class="cell-main">16 oct 2026</div>
                                    <div class="cell-sub">09:42 h</div>
                                </td>
                                <td>
                                    <div class="cell-main">Edificio de Ingeniería</div>
                                    <div class="cell-sub">Piso 2 · Aula 204</div>
                                </td>
                                <td>
                                    <div class="cell-main">Fuga de agua en lavamanos</div>
                                    <div class="cell-sub">Plomería</div>
                                </td>
                                <td><span class="status-pill pending">● Pendiente</span></td>
                                <td class="text-right"><button class="btn-action">Asignar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    </div>
</template>
<script>
    export default {
        name: 'SolicitudesView',

    }
</script>
<style scoped>

    /* Reset & Estilos Base */
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    .layout-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 1rem 2rem;
        box-sizing: border-box;
    }

    /* Sidebar */
    .sidebar {
        width: 250px;
        background-color: #0f233a;
        color: #94a3b8;
        display: flex;
        flex-direction: column;
        padding: 1.5rem 1rem;
        flex-shrink: 0;
    }

    .brand {
        margin-bottom: 2rem;
        padding: 0 0.5rem;
    }

    .logo-box {
        border: 2px dashed #38bdf8;
        color: #ffffff;
        font-weight: 700;
        font-size: 0.85rem;
        padding: 0.4rem 0.6rem;
        display: inline-block;
        border-radius: 4px;
    }

    .section-title {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: #64748b;
        margin-bottom: 0.75rem;
        display: block;
        padding: 0 0.5rem;
    }

    .nav-menu {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.65rem 0.75rem;
        color: #94a3b8;
        text-decoration: none;
        font-size: 0.875rem;
        font-weight: 500;
        border-radius: 6px;
        position: relative;
        transition: all 0.2s;
    }

    .nav-item:hover {
        background-color: #1e324d;
        color: #ffffff;
    }

    .nav-item.active {
        background-color: #1e3553;
        color: #ffffff;
    }

    .active-indicator {
        position: absolute;
        right: 0;
        top: 20%;
        height: 60%;
        width: 3px;
        background-color: #38bdf8;
        border-radius: 2px;
    }

    .icon {
        width: 18px;
        height: 18px;
    }

    .sidebar-footer {
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .info-card {
        background-color: #19314c;
        border-radius: 8px;
        padding: 1rem;
        color: #e2e8f0;
    }

    .info-icon {
        width: 24px;
        height: 24px;
        margin-bottom: 0.5rem;
    }

    .info-card h4 {
        font-size: 0.8rem;
        color: #ffffff;
        margin-bottom: 0.25rem;
    }

    .info-card p {
        font-size: 0.72rem;
        color: #94a3b8;
        line-height: 1.3;
    }

    .version-text {
        font-size: 0.68rem;
        color: #64748b;
        padding: 0 0.5rem;
    }

    /* Main Content */
    .main-content {
        flex: 1;
        /* Ocupa todo el espacio sobrante a la derecha de la sidebar */
        width: 100%;
        padding: 1.5rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        box-sizing: border-box;
    }

    /* Header Superior */
    .top-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .breadcrumb {
        font-size: 0.8rem;
        color: #64748b;
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .breadcrumb .current {
        font-weight: 600;
        color: #1e293b;
    }

    .user-area {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .icon-btn {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #64748b;
    }

    .icon-btn svg {
        width: 18px;
        height: 18px;
    }

    .user-profile {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    .avatar {
        width: 34px;
        height: 34px;
        background-color: #dbeafe;
        color: #1d4ed8;
        font-weight: 700;
        font-size: 0.8rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .user-info {
        display: flex;
        flex-direction: column;
    }

    .user-name {
        font-size: 0.8rem;
        font-weight: 600;
        color: #0f172a;
    }

    .user-role {
        font-size: 0.7rem;
        color: #64748b;
    }

    .chevron {
        width: 14px;
        height: 14px;
        color: #64748b;
    }

    /* Page Title Section */
    .page-title-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .page-title-section h1 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #0f172a;
    }

    .subtitle {
        font-size: 0.85rem;
        color: #64748b;
        margin-top: 0.2rem;
    }

    .btn-primary {
        background-color: #2563eb;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 0.6rem 1.2rem;
        font-size: 0.85rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        cursor: pointer;
    }

    /* Stats Grid */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
    }

    .stat-card {
        background: white;
        border-radius: 10px;
        padding: 1.2rem;
        border: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .stat-info {
        display: flex;
        flex-direction: column;
    }

    .stat-title {
        font-size: 0.75rem;
        color: #64748b;
        margin-bottom: 0.3rem;
    }

    .stat-value {
        font-size: 1.6rem;
        font-weight: 700;
        color: #0f172a;
    }

    .stat-meta {
        font-size: 0.68rem;
        color: #94a3b8;
        margin-top: 0.3rem;
    }

    .stat-icon-wrapper {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .stat-icon-wrapper svg {
        width: 18px;
        height: 18px;
    }

    .stat-icon-wrapper.blue {
        background-color: #eff6ff;
        color: #2563eb;
    }

    .stat-icon-wrapper.yellow {
        background-color: #fefce8;
        color: #ca8a04;
    }

    .stat-icon-wrapper.info-blue {
        background-color: #f0f9ff;
        color: #0284c7;
    }

    .stat-icon-wrapper.green {
        background-color: #f0fdf4;
        color: #16a34a;
    }

    /* Filters Bar */
    .filters-bar {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .search-input-wrapper {
        flex: 1;
        position: relative;
    }

    .search-icon {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        color: #94a3b8;
    }

    .search-input-wrapper input {
        width: 100%;
        padding: 0.55rem 0.75rem 0.55rem 2.2rem;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 0.8rem;
        outline: none;
        background-color: #ffffff;
        color: #0f172a !important;
        /* <-- Esto fuerza que la letra sea oscura al escribir */
    }

    /* Opcional: Asegura que el texto de ayuda (placeholder) se vea en un tono gris legible */
    .search-input-wrapper input::placeholder {
        color: #94a3b8;
    }

    .select-group {
        display: flex;
        gap: 0.75rem;
    }

    .select-wrapper label {
        font-size: 0.68rem;
        font-weight: 600;
        color: #0f172a;
        display: block;
        margin-bottom: 0.2rem;
    }

    .select-wrapper select {
        padding: 0.5rem 0.75rem;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 0.8rem;
        background: white;
        color: #334155;
        outline: none;
    }

    /* Table Container */
    .table-container {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .table-header h2 {
        font-size: 1rem;
        font-weight: 700;
        color: #0f172a;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .badge-count {
        background-color: #eff6ff;
        color: #2563eb;
        font-size: 0.7rem;
        padding: 0.1rem 0.4rem;
        border-radius: 10px;
    }

    .table-subtitle {
        font-size: 0.75rem;
        color: #64748b;
        margin-top: 0.1rem;
    }

    .btn-secondary {
        background-color: white;
        border: 1px solid #e2e8f0;
        padding: 0.45rem 0.8rem;
        border-radius: 6px;
        font-size: 0.78rem;
        font-weight: 600;
        color: #334155;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        cursor: pointer;
    }

    .btn-secondary svg {
        width: 14px;
        height: 14px;
    }

    /* Table */
    .table-wrapper {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 0.78rem;
    }

    th {
        color: #64748b;
        font-weight: 600;
        padding: 0.65rem 0.75rem;
        border-bottom: 1px solid #f1f5f9;
    }

    td {
        padding: 0.75rem;
        border-bottom: 1px solid #f8fafc;
        vertical-align: middle;
    }

    .font-bold {
        font-weight: 600;
    }

    .text-blue {
        color: #2563eb;
    }

    .text-right {
        text-align: right;
    }

    .cell-main {
        font-weight: 500;
        color: #1e293b;
    }

    .cell-sub {
        font-size: 0.7rem;
        color: #94a3b8;
        margin-top: 0.1rem;
    }

    /* Badges de Estado */
    .status-pill {
        font-size: 0.7rem;
        font-weight: 600;
        padding: 0.25rem 0.6rem;
        border-radius: 12px;
        display: inline-block;
    }

    .status-pill.pending {
        background-color: #fef3c7;
        color: #b45309;
    }

    .status-pill.in-progress {
        background-color: #dbeafe;
        color: #1d4ed8;
    }

    .status-pill.resolved {
        background-color: #dcfce7;
        color: #15803d;
    }

    .btn-action {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
        font-size: 0.72rem;
        font-weight: 600;
        color: #334155;
        cursor: pointer;
    }

    /* Paginación */
    .pagination-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.5rem;
    }

    .pagination-info {
        font-size: 0.72rem;
        color: #64748b;
    }

    .pagination-controls {
        display: flex;
        gap: 0.25rem;
        align-items: center;
    }

    .page-btn {
        width: 26px;
        height: 26px;
        border-radius: 4px;
        border: 1px solid #e2e8f0;
        background: white;
        font-size: 0.72rem;
        cursor: pointer;
        color: #334155;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .page-btn.active {
        background-color: #2563eb;
        color: white;
        border-color: #2563eb;
    }

    .dots {
        font-size: 0.72rem;
        color: #94a3b8;
        padding: 0 0.2rem;
    }
</style>
