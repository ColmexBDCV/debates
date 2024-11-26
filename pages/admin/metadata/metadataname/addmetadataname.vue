<template>
  <b-container fluid>
    <h1 class="my-4">Agregar Nuevo Metadato</h1>

    <!-- Formulario para crear un nuevo metadato -->
    <b-form @submit.prevent="saveMetadataName">
      <!-- Campo para el nombre del metadato -->
      <b-form-group label="Nombre del Metadato" label-for="metadato-nombre">
        <b-form-input
          id="metadato-nombre"
          v-model="nombre"
          placeholder="Escribe el nombre del metadato"
          required
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
  name: 'AddMetadataName',
  layout: 'admin',
  data () {
    return {
      nombre: '' // Nombre del metadato que se va a crear
    }
  },
  methods: {
    async saveMetadataName () {
      try {
        if (!this.nombre.trim()) {
          alert('El nombre del metadato es obligatorio.')
          return
        }

        const payload = {
          nombre: this.nombre,
          usuario_id: 1 // Cambiar esto por el ID real del usuario si aplica
        }

        // Realizar la solicitud POST al endpoint
        await axios.post('http://biblio-pruebas.colmex.mx:9081/api/v1/metadata/', payload, {
          headers: { 'Content-Type': 'application/json' }
        })

        alert('Metadato creado exitosamente.')
        this.nombre = '' // Limpiar el campo después de guardar
        this.$router.push('/admin/metadata/metadataname/metadatanames')
      } catch (error) {
        console.error('Error al guardar el metadato:', error)
        alert('Hubo un error al guardar el metadato.')
      }
    }
  }
}
</script>
