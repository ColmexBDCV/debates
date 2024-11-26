<template>
  <b-container fluid>
    <h1 class="my-4">Lista de Metadatos</h1>

    <div class="d-flex justify-content-end mb-3">
      <b-button variant="primary" @click="addMetadataName">Agregar Metadato</b-button>
    </div>
    <!-- Alerta si no hay datos -->
    <b-alert v-if="!metadata.length" variant="warning">
      No se encontraron metadatos.
    </b-alert>

    <!-- Tabla para mostrar los metadatos -->
    <b-table
      v-else
      :items="metadata"
      :fields="fields"
      responsive="sm"
      striped
      hover
    >
      <!-- Personalización de las celdas -->
      <template #cell(usuario)="data">
        {{ data.item.usuario.username }}
      </template>
      <template #cell(actions)="data">
        <b-button
          variant="primary"
          size="sm"
          @click="selectMetadata(data.item.id)"
        >
          Seleccionar
        </b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
export default {
  name: 'AddMetadata',
  layout: 'admin',
  data () {
    return {
      metadata: [], // Lista de metadatos obtenidos de la API
      fields: [
        { key: 'nombre', label: 'Nombre del Metadato' },
        { key: 'fecha_creacion', label: 'Fecha de Creación' },
        { key: 'usuario', label: 'Creado por' }
        // { key: 'actions', label: 'Acciones', class: 'text-center' }
      ] // Configuración de las columnas de la tabla
    }
  },
  async created () {
    try {
      // Llama a la acción Vuex para obtener los metadatos
      const response = await this.$store.dispatch('dashboard/fetchMetadata')
      this.metadata = response // Almacena los datos en el estado local
    } catch (error) {
      console.error('Error al obtener la lista de metadatos:', error)
      alert('No se pudo cargar la lista de metadatos.')
    }
  },
  methods: {
    addMetadataName () {
      // Redirigir a la página donde se puede agregar un valor al metadato seleccionado
      this.$router.push('/admin/metadata/metadataname/addmetadataname')
    }
  }
}
</script>
