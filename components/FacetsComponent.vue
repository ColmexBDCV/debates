<template>
  <b-navbar toggleable="lg" type="light" class="menu-facetas">
    <b-container>
      <b-navbar-toggle target="navbarNavDropdown" />
      <b-collapse id="navbarNavDropdown" is-nav>
        <b-nav class="facet-nav">
          <b-nav-item>
            <div id="facet-accordion">
              <div v-for="(facet, index) in facets" :key="index">
                <b-card no-body class="facet-card">
                  <b-card-header>
                    <b-button v-b-toggle="'facet-' + index" variant="link">
                      {{ $t(facet.label.toLowerCase()) }}
                    </b-button>
                  </b-card-header>
                  <b-collapse :id="'facet-' + index" role="tabpanel" :visible="true">
                    <b-card-body>
                      <b-list-group>
                        <b-list-group-item
                          v-for="(item, i) in facet.items.slice(0, 5)"
                          :key="i"
                          class="bg-facetas"
                          @click="toggleFilter(facet.name, item.value, $t(facet.label.toLowerCase()))"
                        >
                          <b-icon
                            :icon="compare_params(facet.name, item.value) ? 'check-square-fill' : 'square'"
                            variant="light"
                          />
                          {{ item.label }}
                        </b-list-group-item>
                        <b-list-group-item v-if="facet.items.length > 5" class="facet-label bg-facetas">
                          <b-link href="#" @click="get_modal_data_facet(facet.name)">
                            <b-icon icon="plus-circle-fill" />
                            {{ $t('more') }}
                          </b-link>
                        </b-list-group-item>
                      </b-list-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
            </div>
          </b-nav-item>
        </b-nav>
      </b-collapse>
    </b-container>

    <!-- Modal for facets -->
    <facetModal
      v-if="showModal"
      :facet-data="facetData"
      :facet-label="facet_label"
      :facet-page="facet_page"
      @query="query"
      @get-modal-data-facet="get_modal_data_facet"
      @toggle-filter="toggleFilter"
    />
  </b-navbar>
</template>

<script>

export default {
  name: 'FacetsComponent',
  props: {
    facets: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    params: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      facetData: {},
      facet_label: '',
      facet_sort: 'index',
      facet_page: 1
    }
  },
  computed: {
    showModal () {
      return this.$store.getters.modalFacets
    }
  },
  watch: {

  },
  methods: {
    compare_params (type, val) {
      let isActivate = false

      const filtersString = this.$route.query.filters || ''

      // Procesar los filtros como en el handler anterior
      const filtersParams = new URLSearchParams(filtersString)

      filtersParams.forEach((value, key) => {
        if (key === type && value === val) {
          isActivate = true
        }
      })
      return isActivate
    },
    toggleFilter (type, val, label) {
      if (this.compare_params(type, val)) {
        // Si el filtro ya está aplicado, llamamos a delete_query para eliminarlo
        this.delete_query(type, val, label)
      } else {
        // Si no está aplicado, llamamos a query para agregarlo
        this.query(type, val, label)
      }
    },
    query (type, val, label) {
      // Agregar el filtro a la URL
      const urlParams = new URLSearchParams(this.$route.query.filters)
      urlParams.append(type, val)

      // Actualizar la URL
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, filters: urlParams.toString() }
      })
    },
    delete_query (type, val, label) {
      // Eliminar el filtro de la URL
      const urlParams = new URLSearchParams(this.$route.query.filters)
      urlParams.delete(type, val)

      // Actualizar la URL
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, filters: urlParams.toString() }
      })
    },
    async get_modal_data_facet (label, page) {
      try {
        const filtersString = this.$route.query.filters || ''

        // Procesar los filtros como en el handler anterior
        const filtersParams = new URLSearchParams(filtersString)
        const parsedFilters = []

        filtersParams.forEach((value, key) => {
          parsedFilters.push({ key, value })
        })

        const search = this.$route.query.search || ''
        this.facet_page = page || 1
        const facetData = await this.$store.dispatch('fetchModalFacetData', {
          facetLabel: label,
          facetSort: this.facet_sort,
          facetPage: this.facet_page,
          filters: parsedFilters,
          search
        })
        this.facetData = { ...facetData } // Copia para asegurar el cambio de referencia
        this.facet_label = label
        this.$store.dispatch('updateModalFacets', true) // Abre el modal
      } catch (error) {
        console.error('Error al obtener datos de faceta:', error)
      }
    }
  }
}
</script>

<style scoped>
.menu-facetas {
  background-color: #FFFFFF;
}

.facet-card,
.bg-facetas {
  border: none;
}
.facet-card .card-header,
.facet-card .card-body,
.bg-facetas,
.bg-facetas a {
  color: #FFFFFF;
  background-color: var(--bs-collection);
}
.facet-card .btn-link {
  color: #FFFFFF;
}
.facet-card .card-header {
  border-bottom: 1px solid rgba(255, 254, 254, 0.401);
  border-top: 1px solid rgba(255, 254, 254, 0.401);
}
</style>
