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
          Editar
        </b-button>
        <b-button
          variant="danger"
          size="sm"
          class="ml-2"
          @click="openDeleteModal(data.item)"
        >
          Eliminar
        </b-button>
      </template>
    </b-table>
    <!-- Modal de confirmación de eliminación -->
    <b-modal
      v-model="showDeleteModal"
      title="Confirmar eliminación"
      hide-footer
    >
      <p class="my-3">
        ¿Estás seguro de que deseas eliminar
        <strong>{{ selectedMetadata?.nombre }}</strong> y sus valores relacionados?
      </p>
      <div class="text-right">
        <b-button variant="secondary" class="mr-2" @click="cancelDelete">
          Cancelar
        </b-button>
        <b-button variant="danger" @click="confirmDelete(selectedMetadata.id)">
          Eliminar
        </b-button>
      </div>
    </b-modal>
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
        { key: 'usuario', label: 'Creado por' },
        { key: 'actions', label: 'Acciones', class: 'text-center' }
        // { key: 'actions', label: 'Acciones', class: 'text-center' }
      ], // Configuración de las columnas de la tabla
      showDeleteModal: false, // Controla si se muestra el modal
      selectedMetadata: null // Almacena el metadato a eliminar
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
    },
    // Abre el modal, guardando el metadato que se desea eliminar
    openDeleteModal (metadataItem) {
      this.selectedMetadata = metadataItem
      this.showDeleteModal = true
    },
    // Cierra el modal sin eliminar
    cancelDelete () {
      this.showDeleteModal = false
      this.selectedMetadata = null
    },
    async confirmDelete  (metadataId) {
      try {
        // Ajusta el nombre de la action según tu store
        await this.$store.dispatch('dashboard/deleteMetadata', this.selectedMetadata.id)

        // Remueve el elemento de la lista local para no recargar la página
        this.metadata = this.metadata.filter(item => item.id !== this.selectedMetadata.id)
      } catch (error) {
        console.error('Error al eliminar el metadato:', error)
        alert('No se pudo eliminar el metadato. Por favor, intenta nuevamente.')
      } finally {
        this.cancelDelete()
      }
    }
  }
}
</script>
