<template>
  <div>
    <b-row class="center-search">
      <b-col cols="12" md="10" lg="8" class="mx-auto">
        <!-- Barra de búsqueda -->
        <b-input-group class="input-group-shadow">
          <b-form-input id="search_main" v-model="search" placeholder="Ingrese su búsqueda" @keyup.enter="searchData" />
          <b-input-group-append>
            <b-button variant="primary" @click="searchData">
              <b-icon icon="search" /> <!-- Ícono de búsqueda -->
            </b-button>
            <b-button variant="primary" @click="toggleShow">
              ...
            </b-button>
          </b-input-group-append>
        </b-input-group>
        <b-collapse v-model="show" class="mt-1">
          <b-card class="cardMenu">
            <div>
              <b-form-group label="Buscar en:">
                <b-form-radio-group v-model="search_in" buttons>
                  <b-form-radio value="all_fields" variant="primary">
                    Todo
                  </b-form-radio>
                  <b-form-radio value="description">
                    Descripción
                  </b-form-radio>
                  <b-form-radio value="creator">
                    Autor
                  </b-form-radio>
                  <b-form-radio value="title">
                    Título
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>
          </b-card>
        </b-collapse>
      </b-col>
    </b-row>
    <!-- Texto informativo -->
    <b-row class="mt-2">
      <b-col cols="12" md="10" lg="8" class="mx-auto">
        <b-card class="transparent-card text-center border-0">
          <div class="fw-bold text-font">
            <p class="info-text">
              COLECCION DE VIDEOGRABACIONES DE DEBATES ELECTORALES A NIVEL MUNICIPAL, ESTATAL Y FEDERAL
            </p>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'InicioComponent',
  data () {
    return {
      search: '',
      search_in: 'all_fields',
      show: false
    }
  },
  methods: {
    toggleShow () {
      this.show = !this.show
    },
    searchData () {
      console.log('Search: ', this.search)
      if (this.search) {
        this.$store.dispatch('updateSearch', { search: this.search }) // Guarda el término en Vuex
        console.log('Router: Explore')
        this.$router.push({
          path: '/explore',
          query: { search: this.search, search_in: this.search_in, refresh: new Date().getTime() }
        })
      }
    }
  }
}
</script>

<style scope>

.fill-height {
  height: 100%;
}

.transparent-card {
  background-color: rgba(255, 255, 255, 0);
  box-shadow: none;
}

@media (max-width: 768px) {
  .text-font p {
    font-size: 1.5em; /* Reduce el tamaño en pantallas pequeñas */
  }

  .center-search {
    margin-top: 5em; /* Ajusta el margen superior en pantallas móviles */
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .text-font p {
    font-size: 2em; /* Ajusta el tamaño para tablets */
  }

  .center-search {
    margin-top: 5em; /* Ajusta el margen superior en tablets */
  }
}

.cardMenu {
  color: #ffffff;
  background-color: rgb(0 0 0 / 55%);
}

.input-group-shadow {
  display: inline-flex;
  border-radius: 0.25rem;
}

.input-group-shadow:focus-within {
  box-shadow: 0 0 8px rgba(0, 0, 0, 1) !important;
  border-radius: 0.25rem !important;
}

.input-group-shadow input {
  outline: none !important;
  box-shadow: none !important;
}

.center-search {
  margin-top: 25em;
}

.info-text {
  font-size: 2em;
  font-weight: bold;
}

@media (max-width: 576px) {
  .info-text {
    font-size: 1.3em; /* Reduce el tamaño de texto informativo en móviles */
  }
  .center-search {
    margin-top: 5em;
  }
}
</style>
