<template>
  <div class="container mt-5">
    <h2>Catálogo de Productos</h2>
    
    <div class="mb-4">
      <button 
        class="btn btn-sm me-2" 
        :class="!categoriaActiva ? 'btn-dark' : 'btn-outline-dark'"
        @click="resetearFiltros"
      >
        Todos
      </button>
      <button 
        v-for="cat in categorias" 
        :key="cat.id" 
        class="btn btn-sm me-2"
        :class="categoriaActiva?.id === cat.id ? 'btn-dark' : 'btn-outline-dark'"
        @click="filtrarPorCategoria(cat)"
      >
        {{ cat.nombre }}
      </button>
    </div>

    <div class="mb-4">
      <input 
        v-model="busqueda" 
        type="text" 
        class="form-control" 
        placeholder="Buscar producto por nombre..."
      >
    </div>

    <div class="row">
      <div class="col-md-4 mb-4" v-for="producto in productosFiltrados" :key="producto.id">
        <div class="card h-100 shadow-sm">
          <img 
            :src="producto.imagen_url || '/img/placeholder.png'" 
            :alt="producto.nombre" 
            class="card-img-top"
            style="height: 200px; object-fit: cover;"
            @error="e => e.target.src = '/img/placeholder.png'"
          />
          
          <div class="card-body">
            <h5 class="card-title">{{ producto.nombre }}</h5>
            <p class="text-muted small mb-1">{{ producto.categoria?.nombre || 'Sin categoría' }}</p>
            <p class="card-text">${{ producto.precio }}</p>
            
            <div class="d-grid gap-2">
              <router-link :to="`/catalogo/${producto.id}`" class="btn btn-outline-primary btn-sm">
                Ver Detalles
              </router-link>

              <button 
                class="btn btn-sm" 
                :class="carrito.cantidadDeProducto(producto.id) > 0 ? 'btn-success' : 'btn-primary'"
                @click="carrito.agregar(producto)"
              >
                {{ carrito.cantidadDeProducto(producto.id) > 0 ? `En carrito (${carrito.cantidadDeProducto(producto.id)})` : 'Agregar al carrito' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-4 gap-2" v-if="!categoriaActiva && meta.last_page > 1">
      <button class="btn btn-outline-secondary" :disabled="meta.current_page === 1" @click="cargarProductos(meta.current_page - 1)">Anterior</button>
      <span class="align-self-center fw-bold">Página {{ meta.current_page }} de {{ meta.last_page }}</span>
      <button class="btn btn-outline-secondary" :disabled="meta.current_page === meta.last_page" @click="cargarProductos(meta.current_page + 1)">Siguiente</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()
const productos = ref([])
const categorias = ref([])
const categoriaActiva = ref(null)
const busqueda = ref('')
const meta = ref({ current_page: 1, last_page: 1 })

const cargarCategorias = async () => {
  const { data } = await axios.get('http://localhost:8000/api/categorias')
  categorias.value = data.data
}

const cargarProductos = async (page = 1) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/api/productos?page=${page}`)
    productos.value = data.data 
    meta.value = data.meta 
  } catch (error) {
    console.error('Error al cargar productos:', error)
  }
}

const filtrarPorCategoria = async (cat) => {
  categoriaActiva.value = cat
  const { data } = await axios.get(`http://localhost:8000/api/categorias/${cat.id}/productos`)
  productos.value = data.data
  // Al filtrar, reseteamos la meta o la ocultamos
  meta.value = { current_page: 1, last_page: 1 }
}

const resetearFiltros = () => {
  categoriaActiva.value = null
  cargarProductos()
}

const productosFiltrados = computed(() =>
  productos.value.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)

onMounted(() => {
  cargarCategorias()
  cargarProductos()
})
</script>