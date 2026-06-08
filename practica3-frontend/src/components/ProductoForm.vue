<<template>
  <div class="card shadow-sm border-0 mb-4">
    <div class="card-body p-4">
      <h4 class="mb-3 fw-bold text-dark">{{ productoEditar ? 'Editar Producto' : 'Nuevo Producto' }}</h4>
      
      <div v-if="mensaje" :class="['alert', tipoAlerta === 'exito' ? 'alert-success' : 'alert-danger']">
        {{ mensaje }}
      </div>

      <form @submit.prevent="guardar" class="row g-3">
        <div class="col-md-6">
          <label class="form-label fw-bold">Nombre:</label>
          <input v-model="formulario.nombre" type="text" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">Precio:</label>
          <input v-model="formulario.precio" type="number" step="0.01" class="form-control" required />
        </div>
        <div class="col-12">
          <label class="form-label fw-bold">Descripción:</label>
          <textarea v-model="formulario.descripcion" class="form-control" rows="2"></textarea>
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">Stock:</label>
          <input v-model="formulario.stock" type="number" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">Imagen:</label>
          <input type="file" @change="onImageChange" class="form-control" accept="image/*" />
        </div>
        
        <div v-if="preview" class="col-12">
          <img :src="preview" class="img-thumbnail" style="max-height: 150px;" />
        </div>

        <div class="col-12 mt-3">
          <button type="submit" class="btn btn-primary px-4" :disabled="cargando">
            <span v-if="cargando" class="spinner-border spinner-border-sm me-2"></span>
            {{ cargando ? 'Procesando...' : (productoEditar ? 'Actualizar' : 'Guardar') }}
          </button>
          <button type="button" v-if="productoEditar" @click="cancelar" class="btn btn-outline-secondary ms-2">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { createProducto, updateProducto } from '../services/productoService'

const props = defineProps({ productoEditar: { type: Object, default: null } })
const emit = defineEmits(['recargar', 'limpiar-edicion'])

const formulario = ref({ nombre: '', descripcion: '', precio: 0, stock: 0 })
const imagen = ref(null)
const preview = ref(null)
const mensaje = ref('')
const tipoAlerta = ref('')
const cargando = ref(false) // Estado de carga

const resetFormulario = () => {
  formulario.value = { nombre: '', descripcion: '', precio: 0, stock: 0 }
  imagen.value = null
  preview.value = null
}

const onImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    imagen.value = file
    preview.value = URL.createObjectURL(file)
  }
}

const mostrarMensaje = (texto, tipo) => {
  mensaje.value = texto
  tipoAlerta.value = tipo
  setTimeout(() => { mensaje.value = '' }, 3000)
}

watch(() => props.productoEditar, (nuevoProducto) => {
  if (nuevoProducto) {
    formulario.value = { ...nuevoProducto }
    preview.value = nuevoProducto.imagen_url || null
  } else {
    resetFormulario()
  }
}, { immediate: true })

const guardar = async () => {
  // Validación básica en frontend
  if (!formulario.value.nombre || formulario.value.precio <= 0) {
    mostrarMensaje('Por favor, llena los campos correctamente', 'error')
    return
  }

  cargando.value = true // Activa spinner

  const fd = new FormData()
  fd.append('nombre', formulario.value.nombre)
  fd.append('descripcion', formulario.value.descripcion || '')
  fd.append('precio', Number(formulario.value.precio))
  fd.append('stock', Number(formulario.value.stock))
  
  if (imagen.value instanceof File) {
    fd.append('imagen', imagen.value)
  }

  if (props.productoEditar) {
    fd.append('_method', 'PUT')
  }

  try {
    if (props.productoEditar) {
      await updateProducto(props.productoEditar.id, fd)
      mostrarMensaje('Producto actualizado correctamente', 'exito')
    } else {
      await createProducto(fd)
      mostrarMensaje('Producto creado correctamente', 'exito')
      resetFormulario()
    }
    emit('recargar')
    emit('limpiar-edicion')
  } catch (error) {
    mostrarMensaje('Error al guardar, intenta de nuevo', 'error')
  } finally {
    cargando.value = false // Desactiva spinner
  }
}

const cancelar = () => {
  resetFormulario()
  emit('limpiar-edicion')
}
</script>

<style scoped>
.form-container { border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
.btn-guardar { background-color: #4CAF50; color: white; padding: 10px; border: none; cursor: pointer; }
.btn-guardar:disabled { background-color: #a5d6a7; cursor: not-allowed; }
.btn-cancelar { background-color: #f44336; color: white; padding: 10px; border: none; cursor: pointer; margin-left: 10px; }
.alerta { padding: 10px; margin-bottom: 15px; border-radius: 4px; }
.exito { background-color: #d4edda; color: #155724; }
.error { background-color: #f8d7da; color: #721c24; }
</style>