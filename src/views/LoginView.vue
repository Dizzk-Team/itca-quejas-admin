<script setup lang="ts">
import { ref, computed } from 'vue'
import logo from '@/assets/LogoItca.png'

const modoRegistro = ref(false)
const form = ref()
const verPassword = ref(false)
const verConfirmar = ref(false)

const carnet = ref('')
const nombre = ref('')
const password = ref('')
const confirmar = ref('')

const titulo = computed(() => (modoRegistro.value ? 'Crear cuenta' : 'Iniciar sesión'))

const requerido = (v: string) => !!v?.trim() || 'Este campo es obligatorio'
const reglasConfirmar = [
  requerido,
  (v: string) => v === password.value || 'Las contraseñas no coinciden',
]

function cambiarModo() {
  modoRegistro.value = !modoRegistro.value
  form.value?.resetValidation()
}

async function enviar() {
  const { valid } = await form.value.validate()
  if (!valid) return
  // Pendiente: la lógica de login / registro se agregará después
}
</script>

<template>
  <v-app>
    <v-main class="fondo">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="8" lg="5" xl="4">
            <v-card class="tarjeta" elevation="10" rounded="xl">
              <!-- Franja superior roja con detalle dorado -->
              <div class="cabecera">
                <div class="logo">
                  <img :src="logo" alt="Logo ITCA FEPADE" />
                </div>
                <h1 class="marca">ITCA FEPADE</h1>
                <p class="subtitulo">administrador de quejas</p>
              </div>
              <div class="linea-dorada" />

              <v-card-text class="px-8 pt-8 pb-2">
                <h2 class="titulo mb-6">{{ titulo }}</h2>

                <v-form ref="form" @submit.prevent="enviar">
                  <v-text-field
                    v-model="carnet"
                    label="Carnet de administrador"
                    prepend-inner-icon="mdi-card-account-details-outline"
                    variant="outlined"
                    color="primary"
                    :rules="[requerido]"
                    class="mb-2"
                  />

                  <v-text-field
                    v-model="nombre"
                    label="Nombre"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    color="primary"
                    :rules="[requerido]"
                    class="mb-2"
                  />

                  <v-text-field
                    v-model="password"
                    label="Contraseña"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="verPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="verPassword ? 'text' : 'password'"
                    variant="outlined"
                    color="primary"
                    :rules="[requerido]"
                    class="mb-2"
                    @click:append-inner="verPassword = !verPassword"
                  />

                  <v-text-field
                    v-if="modoRegistro"
                    v-model="confirmar"
                    label="Confirmar contraseña"
                    prepend-inner-icon="mdi-lock-check-outline"
                    :append-inner-icon="verConfirmar ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="verConfirmar ? 'text' : 'password'"
                    variant="outlined"
                    color="primary"
                    :rules="reglasConfirmar"
                    class="mb-2"
                    @click:append-inner="verConfirmar = !verConfirmar"
                  />

                  <v-btn type="submit" block size="large" color="primary" class="boton mt-2">
                    {{ modoRegistro ? 'Registrarme' : 'Ingresar' }}
                  </v-btn>
                </v-form>
              </v-card-text>

              <v-card-actions class="justify-center pb-6">
                <span class="texto-cambio">
                  {{ modoRegistro ? '¿Ya tienes cuenta?' : '¿No estás registrado?' }}
                </span>
                <v-btn variant="text" color="dorado" class="enlace" @click="cambiarModo">
                  {{ modoRegistro ? 'Inicia sesión' : 'Regístrate' }}
                </v-btn>
              </v-card-actions>
            </v-card>

            <p class="pie">© ITCA FEPADE · Todos los derechos reservados</p>
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
  object-fit: contain; /* muestra el logo completo, sin recortarlo */
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

.texto-cambio {
  color: #555;
  font-size: 0.9rem;
}

.enlace {
  color: var(--dorado) !important;
  font-weight: 700;
  text-transform: none;
}

.pie {
  text-align: center;
  margin-top: 16px;
  font-size: 0.8rem;
  color: #7a6a2a;
}
</style>