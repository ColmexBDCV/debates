<template>
  <b-container fluid>
    <h1 class="my-4">Registros</h1>

    <!-- Tabla de documentos -->
    <b-table :items="docs" :fields="fields" responsive="sm" striped hover>
      <!-- Columna de acciones personalizada -->
      <template #cell(actions)="data">
        <b-link
          :to="{
            path: `/admin/metadata/metadataregister/${data.item.id}`
          }"
        >
          Metadatos personalizados
        </b-link>
        <!-- <b-button
          variant="primary"
          @click="searchMetadata(data.item.id)"
        >
          Metadatos personalizados
        </b-button>-->
      </template>
    </b-table>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MetadataSite',
  layout: 'admin',
  data () {
    return {
      docs: [], // Documentos para mostrar en la tabla
      base_url: '', // Base URL del repositorio
      fields: [
        { key: 'title', label: 'Título' },
        { key: 'id', label: 'ID del Registro' },
        { key: 'actions', label: 'Acciones', class: 'text-center' }
      ] // Columnas de la tabla
    }
  },
  computed: {
    ...mapGetters(['siteData']) // Información adicional desde Vuex
  },
  methods: {
    ...mapActions('dashboard', ['getRepoDataAdmin']), // Acción de Vuex para obtener datos
    async fetchDocs () {
      try {
        // Llama a la acción de Vuex para obtener datos
        await this.getRepoDataAdmin()
        const response = this.$store.state.dashboard.repo.data.response.docs
        this.docs = response.map(doc => ({
          id: doc.id,
          title: doc.title[0] // Usa el primer título disponible
        }))
        this.base_url = this.$store.state.dashboard.repo.site.base_url
      } catch (error) {
        console.error('Error al obtener los documentos:', error)
      }
    },
    searchMetadata (id) {
      console.log(`Agregar metadato para el documento con ID: ${id}`)
      // Lógica para agregar metadato (puedes llamar a otra acción o endpoint aquí)
    },
    getThumbnail (path) {
      // Devuelve la URL completa de la miniatura
      return this.base_url + path
    }
  },
  async mounted () {
    // Carga los datos cuando el componente se monta
    await this.fetchDocs()
  }
}
</script>

<style scoped>
/* Centrar el contenido de las tarjetas */
.b-card {
  height: 100%;
}
.b-card img {
  max-height: 200px;
  object-fit: cover; /* Ajusta la imagen para que no se deforme */
}
.custom-thumbnail {
  width: 50px; /* Cambia el ancho */
  height: auto; /* Mantiene la proporción */
  object-fit: contain; /* Asegura que la imagen no se deforme */
}
</style>
