<template>
  <div class="top-margin-page">
    <b-container class="h-100">
      <b-row>
        <b-col>
          <div class="title">Contacto</div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div
            style="
              background-image: url('/contacto.jpeg');
              height: 400px;
              background-size: cover;
            "
          />
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col cols="4">
          <p style="font-size: 35px; font-weight: 200;">
            <strong>El Colegio de México A.C.</strong>
          </p>
          <div class="contacto">
            <p>
              Carretera Picacho Ajusco 20, Col. Ampliación Fuentes del Pedregal, Ciudad de México, C.P. 14110
            </p>
            <p>biblio2@colmex.mx</p>
            <p>Tel. 5449 3000 Ext. 2121, 2222</p>
          </div>
        </b-col>
        <b-col cols="8">
          <b-form @submit.prevent="submitMessage">
            <b-form-group class="mb-3">
              <b-form-input
                v-model="form.mail"
                type="email"
                id="email"
                placeholder="mail@example.com"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group class="mb-3">
              <b-form-input
                v-model="form.asunto"
                type="text"
                id="asunto"
                placeholder="Asunto"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group class="mb-3">
              <b-form-textarea
                v-model="form.mensaje"
                id="mensaje"
                rows="8"
                placeholder="Mensaje"
                required
              ></b-form-textarea>
            </b-form-group>
            <b-form-group class="mb-3">
              <b-button type="submit" variant="primary" block>Enviar</b-button>
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>

      <!-- Modal para mostrar la respuesta del servidor -->
      <b-modal id="response-modal" title="Estado del Mensaje" @hide="resetForm">
        <p class="my-4">{{ modalMessage }}</p>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        mail: '',
        asunto: '',
        mensaje: ''
      },
      modalMessage: ''
    }
  },
  methods: {
    async submitMessage () {
      try {
        await this.$store.dispatch('sendMessage', { mail: this.form.mail, asunto: this.form.asunto, mensaje: this.form.mensaje })
        this.modalMessage = 'Mensaje enviado con éxito.'
        this.showModal()
      } catch (error) {
        console.error('Error al enviar el mensaje:', error)
        this.modalMessage = 'Hubo un problema al enviar el mensaje. Por favor, inténtelo de nuevo.'
        this.showModal()
      }
    },
    showModal () {
      this.$bvModal.show('response-modal')
    },
    hideModal () {
      this.$bvModal.hide('response-modal')
    },
    resetForm () {
      this.form.mail = ''
      this.form.asunto = ''
      this.form.mensaje = ''
    }
  }
}
</script>

<style scoped>
.title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5em;
  font-weight: lighter;
  color: var(--bs-collection);
}
.contacto p {
  margin-bottom: 0.5em;
}
</style>
