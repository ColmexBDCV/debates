<template>
  <b-container fluid>
    <h1 class="my-4">Editar Metadato</h1>

    <b-form @submit.prevent="saveMetadata">
      <!-- Mostrar el nombre del metadato -->
      <b-form-group label="Nombre del Metadato">
        <b-form-input :value="metadata.metadatas.nombre" disabled></b-form-input>
      </b-form-group>

      <!-- Mostrar y editar el valor existente -->
      <b-form-group label="Valor Existente">
        <b-form-input
          v-model="metadata.valor"
          placeholder="Escribe el valor"
        ></b-form-input>
      </b-form-group>

      <!-- Botón para guardar -->
      <b-button type="submit" variant="primary">Guardar Metadato</b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditMetadata',
  layout: 'admin',
  data () {
    return {
      metadata: null // Objeto del metadato obtenido
    }
  },
  async asyncData ({ store, params }) {
    try {
      const idRegistro = params.id
      if (!idRegistro) {
        throw new Error('No se proporcionó el ID del registro')
      }

      // Llama a la acción Vuex para obtener los datos
      const response = await store.dispatch('dashboard/fetchMetadataSiteEdit', {
        idRegistro
      })

      if (!response || Object.keys(response).length === 0) {
        throw new Error('No se encontraron datos para el registro')
      }

      // Retorna el metadato completo como referencia
      return { metadata: response }
    } catch (error) {
      console.error('Error al obtener los datos del metadato:', error)
      return { metadata: null }
    }
  },
  methods: {
    async saveMetadata () {
      try {
        if (!this.metadata.valor) {
          alert('Debes escribir un valor antes de guardar.')
          return
        }

        const payload = {
          valor: this.metadata.valor,
          id_metadato: this.metadata.id_metadato,
          id_site: this.metadata.id_site,
          id_registro: this.metadata.id_registro,
          tipo: 'array',
          usuario_id: 1 // Cambiar esto por el ID real del usuario si aplica
        }

        await axios.put(`http://biblio-pruebas.colmex.mx:9081/api/v1/metadatasite/${this.$route.params.id}`, payload, {
          headers: { 'Content-Type': 'application/json' }
        })

        alert('Metadato guardado exitosamente.')
      } catch (error) {
        console.error('Error al guardar el metadato:', error)
        alert('Hubo un error al guardar el metadato.')
      }
    }
  }
}
</script>
