<template>
  <div :key="$route.fullPath">
    <b-container class="top-margin-page">
      <div v-if="error">
        <p>Error al cargar los datos: {{ error }}</p>
      </div>
      <div v-else>
        <p v-if="loading">
          <b-progress :value="progress" max="100" height="20px" class="mb-3">
            <b-progress-bar variant="info" :value="progress" animated show-progress />
          </b-progress>
        </p>
        <div v-else>
          <b-row class="mb-3">
            <b-col cols="6" class="pl-5 ml-3">
              <h3>EXPLORAR LA COLECCION</h3>
            </b-col>
          </b-row>
          <b-row class="mt-5 mb-5">
            <b-col cols="12" class="text-center">
              <b-link
                class="mr-5"
                :to="{
                  path: '/explore'
                }"
              >
                LISTADO COMPLETO
              </b-link>
              <b-nav-item to="/explore/mapexplore">
                NAVEGAR MAPA
              </b-nav-item>
            </b-col>
          </b-row>
          <nuxt-child />
          <b-row>
            <b-col />
          </b-row>
          <b-row v-if="repo && repo.data && repo.data.response" fluid class="mt-2">
            <!-- <b-col cols="4">
                          <FacetsComponent v-if="repo.data.response.facets" :facets="repo.data.response.facets" />
                        </b-col>-->
            <b-col>
              <DocsComponent v-if="repo.data.response.docs && repo.site.base_url" :docs="repo.data.response.docs" :baseurl="repo.site.base_url" />
              <PaginationComponent v-if="repo.data.response.pages" :pages="repo.data.response.pages" />
            </b-col>
          </b-row>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>

async function sendSearchData (store, searchTerm, filtersData, pageTerm) {
  console.log('SearchTerm: ' + searchTerm)
  console.log('Filters: ' + filtersData)
  console.log('PageTerm: ' + pageTerm)
  if (searchTerm || filtersData || pageTerm) {
    await store.dispatch('searchData', { search: searchTerm, facets: filtersData, page: pageTerm })
  } else {
    await store.dispatch('getRepoData')
  }
}

export default {
  async asyncData ({ store, route }) {
    const searchTerm = route.query.search || ''
    const pageTerm = route.query.page
    const filtersData = route.query.filters // Asegúrate de obtener la búsqueda desde el estado o query
    console.log('Search Explore: ', searchTerm)
    console.log('Search Page: ', pageTerm)
    await sendSearchData(store, searchTerm, filtersData, pageTerm)
  },
  data () {
    return {
      loading: false,
      error: null,
      keyword: '',
      progress: 100
    }
  },
  computed: {
    repo () {
      return this.$store.state.repo
    }
  },
  watch: {
    // Observar cambios en la URL de los filtros y la búsqueda
    '$route.query.filters': {
      handler (newFilters) {
        const search = this.$route.query.search || ''
        const page = 1

        // Si los filtros vienen como una cadena en la URL, los procesamos
        const filtersString = newFilters || ''

        // Crear una instancia de URLSearchParams para procesar los filtros
        const filtersParams = new URLSearchParams(filtersString)

        const parsedFilters = []

        // Iterar sobre los filtros y convertirlos en objetos { key, value }
        filtersParams.forEach((value, key) => {
          parsedFilters.push({ key, value })
        })

        // Llamar a la función sendSearchData con los filtros procesados y el término de búsqueda
        sendSearchData(this.$store, search, parsedFilters, page)
      },
      immediate: true
    },
    '$route.query.search': {
      handler (newSearch) {
        const filtersString = this.$route.query.filters || ''
        const page = this.$route.query.page || 1

        // Procesar los filtros como en el handler anterior
        const filtersParams = new URLSearchParams(filtersString)
        const parsedFilters = []

        filtersParams.forEach((value, key) => {
          parsedFilters.push({ key, value })
        })

        // Llamar a la función sendSearchData con la nueva búsqueda y los filtros actuales
        sendSearchData(this.$store, newSearch, parsedFilters, page)
      },
      immediate: true
    },
    '$route.query.page' (newPage) {
      const filtersString = this.$route.query.filters || ''

      // Procesar los filtros como en el handler anterior
      const filtersParams = new URLSearchParams(filtersString)
      const parsedFilters = []

      filtersParams.forEach((value, key) => {
        parsedFilters.push({ key, value })
      })

      const search = this.$route.query.search || ''

      console.log('Page: ' + newPage)
      sendSearchData(this.$store, search, parsedFilters, newPage)
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
