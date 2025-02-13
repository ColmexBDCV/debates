<template>
  <b-container fluid>
    <h1 v-if="!metadata.length" class="my-4">Metadatos del Registro</h1>
    <h1 v-else class="my-4">Metadatos en {{ this.$route.params.id }}</h1>
    <!-- Botón Agregar Metadato -->
    <div class="d-flex justify-content-end mb-3">
      <b-button variant="primary mr-2" @click="addMetadata">Nuevo Valor</b-button>
    </div>

    <!-- Alerta si no hay datos -->
    <b-alert v-if="metadata.length == 0" variant="warning">
      No se encontraron datos para este registro.
    </b-alert>

    <!-- Tabla para mostrar los datos -->
    <b-table
      v-else
      :items="metadata"
      :fields="fields"
      responsive="sm"
      striped
      hover
    >
      <!-- Personalización de las celdas -->
      <template #cell(nombre)="data">
        {{ data.item.metadatas.nombre }}
      </template>
      <template #cell(creado_por)="data">
        {{ data.item.metadatas.usuario.username }}
      </template>
      <template #cell(actions)="data">
        <b-button variant="warning" size="sm" @click="editMetadata(data.item.id)">Editar</b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
export default {
  name: 'MetadataRegister',
  layout: 'admin',
  data () {
    return {
      metadata: [], // Aquí se almacenarán los datos obtenidos
      fields: [
        { key: 'id_registro', label: 'ID Registro' },
        { key: 'nombre', label: 'Metadato' },
        { key: 'valor', label: 'Valor' },
        { key: 'creado_por', label: 'Creado por' },
        { key: 'actions', label: 'Acciones', class: 'text-center' }
      ] // Configuración de las columnas de la tabla
    }
  },
  methods: {
    addMetadata () {
      // Acción para agregar metadato
      // Redirigir a la página add/_id.vue con el id_registro actual
      const idRegistro = this.$route.params.id
      if (!idRegistro) {
        alert('No se proporcionó el ID del registro.')
        return
      }
      this.$router.push(`/admin/metadata/addmetadata/${idRegistro}`)
      // Aquí puedes mostrar un modal o redirigir a otra página para agregar un metadato
    },
    editMetadata (id) {
      // Acción para editar metadato
      this.$router.push(`/admin/metadata/editmetadata/${id}`)
      // Aquí puedes mostrar un modal o redirigir a otra página para editar el metadato
    },
    addMetadataName () {
      this.$router.push('/admin/metadata/addmetadataname/addmetadata')
    }
  },
  async asyncData ({ store, params }) {
    try {
      // Obtén el id_registro desde los parámetros de la URL
      const idRegistro = params.id
      if (!idRegistro) {
        throw new Error('No se proporcionó el ID del registro')
      }

      // Llama a la acción Vuex para obtener los datos
      const response = await store.dispatch('dashboard/fetchMetadataSite', {
        idRegistro
      })

      return { metadata: response } // Retorna los datos para usarlos en el componente
    } catch (error) {
      console.error('Error al obtener los datos del metadato:', error)
      return { metadata: [] } // En caso de error, devuelve un array vacío
    }
  }
}
</script>
