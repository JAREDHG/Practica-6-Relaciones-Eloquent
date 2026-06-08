import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const routes = [
  { path: '/', component: () => import('../views/HomeView.vue') },
  { path: '/catalogo', component: () => import('../views/CatalogoView.vue') },
  {
    path: '/catalogo/:id',
    component: () => import('../views/ProductoDetalle.vue'),
    props: true,
  },
  { path: '/carrito', name: 'carrito', component: () => import('../views/CartView.vue') },
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
  { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },

  // --- RUTAS PROTEGIDAS (Admin) ---
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }, // Se añade requiresAdmin
    children: [
      { path: 'dashboard', name: 'Dashboard', component: () => import('../views/admin/Dashboard.vue') },
      { path: 'crear', name: 'CrearProducto', component: () => import('../views/admin/CrearProducto.vue') },
      { path: 'editar', name: 'EditarProducto', component: () => import('../views/admin/EditarProducto.vue') }
    ]
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// --- GUARD GLOBAL ---
router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (auth.token && !auth.user) {
    await auth.fetchUser()
  }

  // 1. Verificación de Autenticación
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  // 2. Verificación de ROL ADMIN (Punto 4.7.5)
  if (to.meta.requiresAdmin && auth.user?.role !== 'admin') {
    return { path: '/' } // Si no es admin, lo expulsamos al Home
  }
})

export default router