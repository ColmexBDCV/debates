<template>
  <b-modal
    id="facet-modal"
    v-model="isVisible"
    size="lg"
    hide-footer
    :title="$t(formatLabel(facetLabel))"
    @hide="modal_facets_close"
  >
    <b-card>
      <b-card-body v-if="facetData">
        <b-row
          v-for="(item, index) in facetData.data.response.facets.items"
          :key="index"
        >
          <b-col cols="8">
            <b-link @click="triggerToggleFilter(facetLabel, item.value)">
              <span class="facet-label">{{ item.value }}</span>
            </b-link>
          </b-col>
          <b-col cols="3" class="text-right">
            <span class="facet-label">{{ item.hits }}</span>
          </b-col>
        </b-row>
      </b-card-body>

      <b-pagination
        v-model="page"
        :aria-controls="'facet-modal'"
        class="mt-3 justify-content-center"
        :total-rows="totalPages"
        :per-page="itemsPerPage"
        :limit="2"
        @input="handlePagination"
      />

      <b-button variant="collection" class="mt-3" @click="modal_facets_close">
        {{ $t('close') }}
      </b-button>
    </b-card>
  </b-modal>
</template>

<script>

export default {
  name: 'FacetModal',
  props: {
    facetData: {
      type: Object,
      default: () => ({})
    },
    facetLabel: {
      type: String,
      default: ''
    },
    facetPage: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      page: 1,
      itemsPerPage: 20, // Puedes ajustarlo según la cantidad de items que quieras mostrar
      totalPages: 20,
      data_local: ''
    }
  },
  computed: {
    isVisible: {
      get () {
        return this.$store.getters.modalFacets
      },
      set (value) {
        // Llama a la acción para cambiar el estado en Vuex
        this.$store.dispatch('updateModalFacets', value)
      }
    }
  },
  watch: {
    facetData: {
      immediate: true,
      handler (newVal) {
        if (newVal) {
          this.totalPages = newVal.data.response.facets.isNextPage ? this.facetData.data.response.facets.limit * (this.facetPage + 1) : this.facetData.data.response.facets.limit * this.facetPage
        }
        this.data_local = newVal
      }
    },
    facetPage: {
      immediate: true,
      handler (newVal) {
        this.page = newVal
      }
    }
  },
  created () {

  },
  methods: {
    modal_facets_close () {
      this.$bvModal.hide('facet-modal')
    },
    query (value, label) {
      this.$emit('query', this.facet_label, value, label)
      this.modal_facets_close()
    },
    handlePagination (page) {
      this.page = page
      this.emitGetModalDataFacet(this.facetLabel, page)
    },
    emitGetModalDataFacet (label, page) {
      this.$emit('get-modal-data-facet', label, page) // Emitir un evento con el nombre 'get-modal-data-facet'
    },
    triggerToggleFilter (type, val, label) {
      this.$emit('toggle-filter', type, val, label) // Emite el evento al componente padre
      this.$bvModal.hide('facet-modal')
    },
    formatLabel (label) {
      return label.replace('_sim', '')
    }
  }
}
</script>

<style>
#facet-modal{
  color: #FFFFFF;
  background-color: var(--bs-collection);
}
</style>
