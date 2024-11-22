<template>
  <div>
    <b-navbar id="generic-nav"  toggleable="lg" fixed="top">
      <b-container class="text-light">
        <!--<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>-->
         <div class="w-100">
          <b-row class="w-100" align-v="center">
            <b-col>
              <b-navbar-nav class="align-items-center nav-align">
                <b-navbar-brand id="logo-nav">
                  <nuxt-link to="/" exact>
                    <b-img src="/logo_debates.png" alt="Logo" width="120" />
                  </nuxt-link>
                </b-navbar-brand>
                <div class="nav-item">
                  <div class="nav-link">
                    <nuxt-link to="/about" exact>
                      EL PROYECTO
                    </nuxt-link>
                  </div>
                </div>
                <div class="nav-item">
                  <div class="nav-link">
                    <nuxt-link to="/explore" exact>
                      EXPLORAR
                    </nuxt-link>
                  </div>
                </div>
                <div class="nav-item">
                  <div class="nav-link">
                    <nuxt-link to="/maps" exact>
                      MAPA
                    </nuxt-link>
                  </div>
                </div>
                <div class="nav-item">
                  <div class="nav-link">
                    <nuxt-link to="/contact" exact>
                      CONTACTO
                    </nuxt-link>
                  </div>
                </div>
              </b-navbar-nav>
            </b-col>
            <b-col cols="4" class="d-flex justify-content-end">
              <b-input-group id="search_top" v-if="this.$route.path !== '/'">
                <b-form-input  v-model="search" placeholder="Búsqueda" @keyup.enter="searchData" />
                <b-input-group-append>
                  <b-button variant="primary" class="btn-border-black" @click="searchData">
                    <b-icon icon="search" /> <!-- Ícono de búsqueda -->
                  </b-button>
                  <b-button variant="light" class="btn-border-black">
                    ...
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
        </div><!--</b-collapse>-->
      </b-container>
    </b-navbar>
    <b-navbar id="movil-nav" toggleable="lg" fixed="top">
      <b-container class="text-light">
        <b-navbar-brand id="logo-nav">
          <nuxt-link to="/" exact>
            <b-img src="/logo_debates.png" alt="Logo" width="80" />
          </nuxt-link>
        </b-navbar-brand>
        <b-navbar-toggle style="margin-right: 1em;" target="nav-collapse"></b-navbar-toggle>
        <b-col md="4" class="d-flex justify-content-end mb-3">
          <b-input-group id="search_top" v-if="this.$route.path !== '/'">
            <b-form-input  v-model="search" placeholder="Búsqueda" @keyup.enter="searchData" />
            <b-input-group-append>
              <b-button variant="primary" class="btn-border-black" @click="searchData">
                <b-icon icon="search" /> <!-- Ícono de búsqueda -->
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-collapse id="nav-collapse" is-nav>
          <b-row class="w-100" align-v="center">
            <b-col>
              <b-navbar-nav class="align-items-center nav-align">
                <div class="nav-item">
                  <div class="nav-link">
                    <nuxt-link to="/about" exact>
                      EL PROYECTO
                    </nuxt-link>
                  </div>
                </div>
                <div class="nav-item">
                  <div class="nav-link">
                    <nuxt-link to="/explore" exact>
                      EXPLORAR
                    </nuxt-link>
                  </div>
                </div>
                <div class="nav-item">
                  <div class="nav-link">
                    <nuxt-link to="/maps" exact>
                      MAPA
                    </nuxt-link>
                  </div>
                </div>
                <div class="nav-item">
                  <div class="nav-link">
                    <nuxt-link to="/contact" exact>
                      CONTACTO
                    </nuxt-link>
                  </div>
                </div>
              </b-navbar-nav>
            </b-col>
          </b-row>
        </b-collapse>
      </b-container>
    </b-navbar>
    <main>
      <transition name="fade" mode="out-in">
        <Nuxt />
      </transition>
    </main>
    <footer class="text-center pb-4">
      <div>
        <div style="background-color: #F5F5F5; height: 100px; border-bottom: solid 3px #E5E4E3; text-align: center;"
            class="p-3 logos-footer">
          <a href="https://colmex.mx">
            <img src="/logo_colmex.svg" class="me-5 logo-colmex" alt="">
          </a>
          <a href="https://biblioteca.colmex.mx/">
            <img src="/logooficial_bdcv.png" class="me-5 logo-bdcv" alt="">
          </a>
          <a href="https://mexico.sil.org/es">
            <img src="/logo_debates.png" alt="" class="me-5 logo-generic" >
          </a>
        </div>
        <div style="background-color: #F5F5F5; height: 100px; text-align: center;" class="p-4 dir-footer">
          <p>
            El Colegio de México A.C. Carretera Picacho Ajusco 20, Col. Ampliación Fuentes
            del Pedregal, C.P. 14110 Tlalpan, Ciudad de México
          </p>
          <p>
            biblio2@colmex.mx | +5255 5449-3000 ext.: 2121, 2122 | Horario de servicio:
            Lunes a Viernes 8:30 - 20:30 hrs
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      search: '',
      search_in: 'all_fields',
      show: false,
      showSearchInput: true
    }
  },
  methods: {
    toggleShow () {
      this.show = !this.show
    },
    searchData () {
      console.log('Search: ', this.search)
      this.$store.dispatch('updateSearch', { search: this.search }) // Guarda el término en Vuex
      console.log('Router: Explore')
      this.$router.push({
        path: '/explore',
        query: { search: this.search, search_in: this.search_in, refresh: new Date().getTime() }
      })
    }
  }
}
</script>

<style>
#generic-nav {
  border-bottom: 6px var(--bs-collection) solid;
  padding: 0;
  background: #F5F5F5;
  display: block;
}

#movil-nav{
  display: none;
}

#generic-nav .nav-item .nav-link {
  color: var(--bs-collection);
}

#logo-nav {
  margin-right: 2em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.btn-border-black {
  border: 1px solid #CED4DA;
  border-radius: 5px;
}

@media (max-width: 768px) {

  #logo-nav {
    margin-left: 1em;
  }

  #movil-nav{
    border-bottom: 6px var(--bs-collection) solid;
    padding: 0;
    background: #F5F5F5;
    display: block;
    margin-bottom: 0.5em;
  }
  .nav-align {
    padding: 0;
  }

  #generic-nav .nav-item {
    margin-bottom: 0.5em;
  }

  #generic-nav {
    display: none;
  }

  .logos-footer a img {
    margin-bottom: 1em;
  }

  .dir-footer {
    font-size: 0.8em;
  }
  .logo-colmex{
    width: 200px !important;
  }

  .logo-bdcv{
    width: 80px !important;
  }
  .logo-generic{
    width: 65px !important;
  }
}

.logo-colmex{
    width: 350px;
}

.logo-bdcv{
    width: 140px;
}

.logo-generic{
    width: 90px;
}

.logos-footer {
  background-color: #F5F5F5;
  height: auto;
  border-bottom: solid 3px #E5E4E3;
  text-align: center;
}

.dir-footer {
  background-color: #F5F5F5;
  text-align: center;
  font-size: 0.9em;
}
</style>
