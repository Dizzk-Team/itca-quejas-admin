<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/LogoItca.png'

const router = useRouter()

const form = ref()
const verPassword = ref(false)

const correo = ref('')
const password = ref('')
const cargando = ref(false)
const mensajeError = ref('')

const requerido = (v: string) =>
  !!v?.trim() || 'Este campo es obligatorio'

const enviar = async () => {
  mensajeError.value = ''
  cargando.value = true

  try {
    const respuesta = await fetch(
      'https://itca-quejas-api.onrender.com/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          correo_institucional: correo.value.trim(),
          password: password.value
        })
      }
    )

    const resultado = await respuesta.json()

    if (!respuesta.ok) {
      // Si las credenciales son incorrectas, limpiamos la contraseña por seguridad
      password.value = ''
      throw new Error(resultado.message || 'Error al iniciar sesión')
    }

    if (!resultado.access_token) {
      password.value = ''
      throw new Error('La API no devolvió el token de acceso')
    }

    // Guardar los datos de sesión
    localStorage.setItem('token_sesion', resultado.access_token)
    localStorage.setItem('creador_id', resultado.creador_id)
    localStorage.setItem('tipo_token', resultado.token_type)
    localStorage.setItem('nombre_usuario', resultado.creador?.nombre_completo || resultado.nombre || correo.value.split('@')[0])
    localStorage.setItem('correo_usuario', resultado.creador?.correo_institucional || correo.value)
    localStorage.setItem('rol_usuario', resultado.creador?.rol || 'Administrador')

    // Limpiar los campos al iniciar sesión correctamente
    correo.value = ''
    password.value = ''

    // Redirigir al inicio
    await router.push({ name: 'inicio' })

  } catch (error: any) {
    console.error('Error en el inicio de sesión:', error)
    mensajeError.value = error.message || 'No se pudo conectar con el servidor'
  } finally {
    cargando.value = false
  }
}
</script>



<template>
  <v-app>
    <v-main class="fondo">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="8" lg="5" xl="4">
            <v-card class="tarjeta" elevation="10" rounded="xl">

              <!-- Cabecera -->
              <div class="cabecera">
                <div class="logo">
                  <img :src="logo" alt="Logo ITCA FEPADE" />
                </div>

                <h1 class="marca">ITCA FEPADE</h1>
                <p class="subtitulo">administrador de quejas</p>
              </div>

              <div class="linea-dorada" />

              <v-card-text class="px-8 pt-8 pb-6">
                <h2 class="titulo mb-6">Iniciar sesión</h2>

                <!-- Mensaje de error -->
                <v-alert
                  v-if="mensajeError"
                  type="error"
                  variant="tonal"
                  class="mb-4"
                  density="compact"
                >
                  {{ mensajeError }}
                </v-alert>

                <v-form ref="form" @submit.prevent="enviar">

                  <!-- Correo institucional -->
                  <v-text-field
                    v-model="correo"
                    label="Correo institucional"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    color="primary"
                    :rules="[requerido]"
                    class="mb-2"
                  />

                  <!-- Contraseña -->
                  <v-text-field
                    v-model="password"
                    label="Contraseña"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="
                      verPassword ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    :type="verPassword ? 'text' : 'password'"
                    variant="outlined"
                    color="primary"
                    :rules="[requerido]"
                    class="mb-4"
                    @click:append-inner="verPassword = !verPassword"
                  />

                  <!-- Botón ingresar -->
                  <v-btn
                    type="submit"
                    block
                    size="large"
                    color="primary"
                    class="boton mt-2"
                    :loading="cargando"
                  >
                    Ingresar
                  </v-btn>

                </v-form>
              </v-card-text>
            </v-card>

            <!-- Pie de página -->
            <p class="pie">
              © ITCA FEPADE · Todos los derechos reservados
            </p>

          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<style scoped>
/* Paleta: blanco, rojo y dorado */
.fondo {
  --rojo: #c8102e;
  --rojo-oscuro: #9b0c23;
  --dorado: #c9a227;
  background: linear-gradient(160deg, #ffffff 0%, #fbf6e6 55%, #f3e3b0 100%);
}

.tarjeta {
  overflow: hidden;
  background: #ffffff;
  border-top: 4px solid var(--dorado);
}

.cabecera {
  background: linear-gradient(135deg, var(--rojo) 0%, var(--rojo-oscuro) 100%);
  color: #ffffff;
  text-align: center;
  padding: 28px 16px 24px;
}

.logo {
  width: 250px;
  height: 100px;
  margin: 0 auto 12px;
  padding: 10px 14px;
  background: #ffffff;
  border: 3px solid var(--dorado);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo img {
  max-width: 150%;
  max-height: 150%;
  object-fit: contain;
}

.marca {
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: 2px;
}

.subtitulo {
  font-size: 0.9rem;
  opacity: 0.9;
}

.linea-dorada {
  height: 5px;
  background: linear-gradient(90deg, var(--dorado), #e8cf75, var(--dorado));
}

.titulo {
  color: var(--rojo);
  font-weight: 700;
  text-align: center;
}

.boton {
  background: var(--rojo) !important;
  color: #ffffff !important;
  font-weight: 700;
  letter-spacing: 1px;
  border-bottom: 3px solid var(--dorado);
}

.pie {
  text-align: center;
  margin-top: 16px;
  font-size: 0.8rem;
  color: #7a6a2a;
}
</style>