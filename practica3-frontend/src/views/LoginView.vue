<template>
  <div class="auth-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Email:</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div>
        <label>Contraseña:</label>
        <input v-model="form.password" type="password" required />
      </div>
      <button type="submit">Entrar</button>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
// 1. Importamos las herramientas de navegación de Vue Router
import { useRouter, useRoute } from 'vue-router'

const authStore = useAuthStore()
// 2. Inicializamos el router (para mover) y el route (para leer la URL)
const router = useRouter()
const route = useRoute()

const form = ref({ email: '', password: '' })
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    await authStore.login(form.value)
    
    // 3. MAGIA DE REDIRECCIÓN: Si el cadenero guardó una ruta pendiente en la URL, 
    // lo mandamos ahí. Si entró directo al login, lo mandamos a /admin.
    const redirectPath = route.query.redirect || '/admin'
    router.push(redirectPath)
    
  } catch (error) {
    errorMessage.value = 'Credenciales incorrectas. Intenta de nuevo.'
  }
}
</script>