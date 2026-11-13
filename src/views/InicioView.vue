<script setup lang="ts">
import { ref, onMounted } from 'vue'

const resumen = ref([
  { titulo: 'Total del mes', valor: 0, icono: 'mdi-inbox-full-outline', clase: 'total' },
  { titulo: 'Pendientes', valor: 0, icono: 'mdi-clock-alert-outline', clase: 'rojo' },
  { titulo: 'En proceso', valor: 0, icono: 'mdi-progress-wrench', clase: 'dorado' },
  { titulo: 'Resueltas', valor: 0, icono: 'mdi-check-circle-outline', clase: 'verde' },
])

const urgentes = ref<any[]>([])
const recientes = ref<any[]>([])
const cargando = ref(false)

// Función para calcular cuántos días han pasado desde que se creó el reporte
const calcularDiasTranscurridos = (fechaIso: string) => {
  if (!fechaIso) return 0
  const fechaReporte = new Date(fechaIso)
  const fechaActual = new Date()
  const diferenciaMs = fechaActual.getTime() - fechaReporte.getTime()
  return Math.floor(diferenciaMs / (1000 * 60 * 60 * 24))
}

// Función para formatear fechas a DD/MM/YYYY
const formatearFecha = (fechaIso: string) => {
  if (!fechaIso) return ''
  const fecha = new Date(fechaIso)
  return fecha.toLocaleDateString('es-SV', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const obtenerDatosInicio = async () => {
  cargando.value = true
  try {
    const respuesta = await fetch('https://itca-quejas-api.onrender.com/api/reportes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!respuesta.ok) {
      throw new Error('Error al obtener los datos del servidor')
    }

    const resultado = await respuesta.json()
    const reportes: any[] = resultado.data ?? []

    // 1. Conteo de estados para el resumen
    const total = reportes.length
    const pendientes = reportes.filter(r => r.estado === 'Pendiente').length
    const enProceso = reportes.filter(r => r.estado === 'En proceso' || r.estado === 'En Proceso').length
    const resueltas = reportes.filter(r => r.estado === 'Resuelta' || r.estado === 'Resuelto').length

    resumen.value = [
      { titulo: 'Total del mes', valor: total, icono: 'mdi-inbox-full-outline', clase: 'total' },
      { titulo: 'Pendientes', valor: pendientes, icono: 'mdi-clock-alert-outline', clase: 'rojo' },
      { titulo: 'En proceso', valor: enProceso, icono: 'mdi-progress-wrench', clase: 'dorado' },
      { titulo: 'Resueltas', valor: resueltas, icono: 'mdi-check-circle-outline', clase: 'verde' },
    ]

    // 2. Mapear quejas que requieren atención (No resueltas, mostrando su prioridad real)
    urgentes.value = reportes
      .filter(r => r.estado !== 'Resuelta' && r.estado !== 'Resuelto')
      .map(r => ({
        codigo: r.id ? `Q-${r.id.substring(0, 4).toUpperCase()}` : 'Q-0000',
        asunto: r.descripcion || r.ubicacion_exacta || 'Sin asunto',
        dias: calcularDiasTranscurridos(r.fechas?.reporte || r.created_at),
        prioridad: r.prioridad || 'Baja'
      }))
      .slice(0, 3)

    // 3. Mapear últimas quejas recibidas para la tabla
    recientes.value = reportes
      .slice(0, 5)
      .map(r => ({
        codigo: r.id ? `Q-${r.id.substring(0, 4).toUpperCase()}` : 'Q-0000',
        asunto: r.descripcion || r.ubicacion_exacta || 'Sin asunto',
        fecha: formatearFecha(r.fechas?.reporte || r.created_at),
        estado: r.estado || 'Pendiente'
      }))

  } catch (error) {
    console.error('Hubo un problema al cargar los reportes:', error)
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  obtenerDatosInicio()
})

const colorEstado = (e: string) =>
  e === 'Pendiente' ? 'red-darken-1' : (e === 'En proceso' || e === 'En Proceso') ? 'amber-darken-2' : 'green-darken-1'
</script>

<template>
  <v-container class="inicio" fluid>
    <!-- Bienvenida -->
    <v-card class="bienvenida" rounded="xl" elevation="6">
      <div class="bienvenida-contenido">
        <div>
          <p class="saludo">Bienvenido(a) al panel de</p>
          <h1 class="titulo-principal">ITCA FEPADE</h1>
          <p class="descripcion">Administrador de quejas y solicitudes</p>
        </div>
        <div class="contenedor-logo">
          <img 
            src="@/assets/EscudoItca.jpg" 
            alt="Logo ITCA FEPADE" 
            class="logo-itca"
          />
        </div>
      </div>
      <div class="linea-dorada" />
    </v-card>

    <!-- Resumen -->
    <h2 class="seccion">Resumen</h2>
    <v-row>
      <v-col v-for="r in resumen" :key="r.titulo" cols="12" sm="6" md="3">
        <v-card class="resumen" :class="r.clase" rounded="xl" elevation="3">
          <v-card-text class="d-flex align-center ga-4">
            <v-avatar size="56" class="resumen-icono">
              <v-icon :icon="r.icono" size="32" />
            </v-avatar>
            <div>
              <div class="numero">{{ r.valor }}</div>
              <div class="etiqueta">{{ r.titulo }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quejas que requieren atención (Sin el botón) -->
    <h2 class="seccion">Requieren atención</h2>
    <v-row>
      <v-col v-for="u in urgentes" :key="u.codigo" cols="12" md="4">
        <v-card class="urgente" rounded="xl" elevation="3">
          <v-card-text>
            <div class="d-flex align-center justify-space-between mb-2">
              <span class="urgente-codigo">{{ u.codigo }}</span>
              <v-chip
                :color="u.prioridad === 'Alta' || u.prioridad === 'Urgente' ? 'red-darken-1' : 'amber-darken-2'"
                size="small"
                variant="flat"
              >
                Prioridad {{ u.prioridad }}
              </v-chip>
            </div>
            <div class="urgente-asunto">{{ u.asunto }}</div>
            <div class="urgente-dias">
              <v-icon icon="mdi-timer-sand" size="16" />
              Sin atender hace {{ u.dias }} días
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Últimas quejas -->
    <h2 class="seccion">Últimas quejas recibidas</h2>
    <v-card rounded="xl" elevation="3" class="tabla-tarjeta">
      <v-table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Asunto</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="q in recientes" :key="q.codigo">
            <td class="font-weight-bold">{{ q.codigo }}</td>
            <td>{{ q.asunto }}</td>
            <td>{{ q.fecha }}</td>
            <td>
              <v-chip :color="colorEstado(q.estado)" size="small" variant="flat">
                {{ q.estado }}
              </v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<style scoped>
/* Paleta: blanco, rojo y dorado */
.inicio {
  --rojo: #c8102e;
  --rojo-oscuro: #9b0c23;
  --dorado: #c9a227;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 40px;
}

.bienvenida {
  overflow: hidden;
  border-top: 4px solid var(--dorado);
  background: linear-gradient(135deg, var(--rojo) 0%, var(--rojo-oscuro) 100%);
  color: #ffffff;
}

.bienvenida-contenido {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 32px;
}

.saludo {
  font-size: 0.95rem;
  opacity: 0.9;
}

.titulo-principal {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 2px;
}

.descripcion {
  opacity: 0.9;
}

.contenedor-logo {
  background: rgba(255, 255, 255, 0.95);
  padding: 10px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.logo-itca {
  max-height: 65px;
  width: auto;
  object-fit: contain;
}

.linea-dorada {
  height: 5px;
  background: linear-gradient(90deg, var(--dorado), #e8cf75, var(--dorado));
}

.seccion {
  margin: 32px 0 12px;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--rojo);
  display: flex;
  align-items: center;
}

.seccion::after {
  content: '';
  flex: 1;
  height: 2px;
  margin-left: 14px;
  background: linear-gradient(90deg, var(--dorado), transparent);
}

/* Tarjetas de resumen */
.resumen {
  background: #ffffff;
  border-left: 6px solid var(--rojo);
}

.resumen.dorado {
  border-left-color: var(--dorado);
}

.resumen.verde {
  border-left-color: #43a047;
}

.resumen-icono {
  background: #fbf6e6;
  color: var(--rojo);
}

.resumen.dorado .resumen-icono {
  color: var(--dorado);
}

.resumen.verde .resumen-icono {
  color: #43a047;
}

.numero {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  color: #333;
}

.etiqueta {
  color: #666;
  font-weight: 600;
}

.resumen.total {
  border-left-color: #333;
}

.resumen.total .resumen-icono {
  color: #333;
}

/* Quejas que requieren atención */
.urgente {
  background: #ffffff;
  border-bottom: 4px solid var(--dorado);
}

.urgente-codigo {
  font-weight: 800;
  color: var(--rojo);
}

.urgente-asunto {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  min-height: 48px;
}

.urgente-dias {
  color: #777;
  font-size: 0.85rem;
}

/* Tabla */
.tabla-tarjeta {
  border-top: 4px solid var(--dorado);
  overflow: hidden;
}

.tabla-tarjeta :deep(th) {
  background: #fbf6e6;
  color: var(--rojo);
  font-weight: 700 !important;
}
</style>