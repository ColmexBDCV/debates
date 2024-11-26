<template>
  <b-container fluid>
    <h1 class="my-4">Agregar Metadato</h1>

    <b-form @submit.prevent="saveMetadata">
      <!-- Dropdown para seleccionar el nombre del metadato -->
      <b-form-group label="Nombre del Metadato">
        <b-form-select
          v-model="selectedMetadataId"
          :options="metadataOptions"
          placeholder="Selecciona un metadato"
          required
        ></b-form-select>
      </b-form-group>

      <!-- Inputs dinámicos para los valores -->
      <b-form-group label="Valores">
        <div v-for="(value, index) in valores" :key="index" class="d-flex mb-2">
          <b-form-input
            v-model="valores[index]"
            placeholder="Escribe un valor"
          ></b-form-input>
          <b-button
            variant="danger"
            size="sm"
            class="ml-2"
            @click="removeValue(index)"
          >
            Quitar
          </b-button>
        </div>
      </b-form-group>

      <!-- Botón para agregar más valores -->
      <b-button variant="success" size="sm" class="mb-3" @click="addValue">
        Agregar Valor
      </b-button>

      <!-- Botón para guardar -->
      <b-button type="submit" variant="primary">Guardar Metadato</b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddMetadata',
  layout: 'admin',
  data () {
    return {
      metadataOptions: [], // Opciones para el dropdown de metadatos
      selectedMetadataId: null, // ID del metadato seleccionado
      valores: [] // Lista de valores dinámicos
    }
  },
  async created () {
    try {
      // Obtener la lista de metadatos usando la acción Vuex
      const response = await this.$store.dispatch('dashboard/fetchMetadata')

      // Mapear las opciones para el dropdown
      this.metadataOptions = response.map(metadata => ({
        value: metadata.id,
        text: metadata.nombre
      }))
    } catch (error) {
      console.error('Error al obtener la lista de metadatos:', error)
      alert('No se pudo cargar la lista de metadatos.')
    }
  },
  methods: {
    addValue () {
      this.valores.push('') // Agrega un nuevo input vacío
    },
    removeValue (index) {
      this.valores.splice(index, 1) // Elimina el valor en la posición especificada
    },
    async saveMetadata () {
      try {
        // Obtener el id_registro de la URL
        const idRegistro = this.$route.params.id
        if (!idRegistro) {
          alert('No se proporcionó el ID del registro.')
          return
        }

        if (!this.selectedMetadataId) {
          alert('Debes seleccionar un metadato.')
          return
        }

        if (!this.valores.length) {
          alert('Debes agregar al menos un valor antes de guardar.')
          return
        }

        for (const valor of this.valores) {
          const payload = {
            valor,
            id_metadato: this.selectedMetadataId, // Enviar el ID del metadato seleccionado
            id_site: 1, // Cambiar esto por el ID real del sitio si aplica
            id_registro: idRegistro, // Usar el ID del registro obtenido de la URL
            tipo: 'array',
            usuario_id: 1 // Cambiar esto por el ID real del usuario si aplica
          }

          await axios.post('http://biblio-pruebas.colmex.mx:9081/api/v1/metadatasite/', payload, {
            headers: { 'Content-Type': 'application/json' }
          })
        }

        alert('Metadatos guardados exitosamente.')
        this.valores = [] // Limpia los valores después de guardar
        this.selectedMetadataId = null // Limpia el dropdown seleccionado
      } catch (error) {
        console.error('Error al guardar los metadatos:', error)
        alert('Hubo un error al guardar los metadatos.')
      }
    }
  }
}
</script>
