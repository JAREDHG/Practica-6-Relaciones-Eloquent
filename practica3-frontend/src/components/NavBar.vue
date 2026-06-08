<template>
  <nav class="navbar" v-if="authStore.isAuthenticated">
    <div class="nav-brand">📦 Sistema de Catálogo</div>
    <div class="nav-user">
      <span class="user-name">Bienvenido, {{ authStore.user?.name || 'Usuario' }}</span>
      <button @click="handleLogout" class="btn-logout">Cerrar Sesión</button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const handleLogout = async () => {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    await authStore.logout()
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e293b;
  color: #f8fafc;
  padding: 15px 30px;
  border-radius: 4px;
  margin-bottom: 20px;
}
.nav-brand {
  font-weight: bold;
  font-size: 1.2rem;
}
.user-name {
  margin-right: 15px;
  font-size: 0.95rem;
}
.btn-logout {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 500;
  transition: background 0.2s;
}
.btn-logout:hover {
  background-color: #dc2626;
}
</style>