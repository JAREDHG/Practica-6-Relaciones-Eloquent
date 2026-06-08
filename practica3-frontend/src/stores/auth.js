import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  // Variables de estado
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  // Computed para saber si hay sesión activa
  const isAuthenticated = computed(() => !!token.value)

  // Función de Login
  const login = async (credenciales) => {
    try {
      const respuesta = await axios.post('http://localhost:8000/api/login', credenciales)
      token.value = respuesta.data.token
      user.value = respuesta.data.user
      localStorage.setItem('token', token.value)
    } catch (error) {
      throw error
    }
  }

  // Función de Logout
  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  // LA FUNCIÓN QUE EL ROUTER NECESITABA (fetchUser)
  const fetchUser = async () => {
    try {
      const respuesta = await axios.get('http://localhost:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      user.value = respuesta.data
    } catch (error) {
      // Si el token falló o caducó, cerramos la sesión por seguridad
      console.error('Error al obtener usuario. Token inválido.')
      logout()
    }
  }

  // Exponemos las variables y funciones para que el resto de la app las use
  return { user, token, isAuthenticated, login, logout, fetchUser }
})