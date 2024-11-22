export const state = () => ({
  apiUrl: 'http://biblio-pruebas.colmex.mx:9081/api/v1', // URL base del API
  sitio: 'Debates Electorales',
  repo: '',
  siteId: 1,
  modalFacets: false,
  filters: {
    facet: []
  },
  search: ''
})

export const getters = {
  apiUrl: state => state.apiUrl,
  modalFacets: state => state.modalFacets,
  getFilters: state => state.filters,
  getRepo: state => state.repo,
  siteId: state => state.siteId,
  getSearch: state => state.search,
  getSitio: state => state.sitio
}

export const mutations = {
  setApiUrl (state, newUrl) {
    state.apiUrl = newUrl
  },
  setRepo (state, newRepo) {
    state.repo = newRepo
  },
  setSearch (state, search) {
    state.search = search
  },
  setModalFacets (state, active) {
    state.modalFacets = active
  },
  addFilter (state, { type, value }) {
    if (!state.filters[type].includes(value)) {
      state.filters[type].push(value)
    }
  },
  updateFiltersFacet (state, { key, value }) {
    const existingFacet = state.filters.facet.find(facet => facet.key === key && facet.value === value)

    if (!existingFacet) {
      state.filters.facet.push({ key, value })
    } else {
      console.log('El facet con esa clave ya existe y no se agregará.')
    }
  },
  removeFiltersFacet (state, { key, value }) {
    // Encuentra el índice del filtro que queremos eliminar
    const index = state.filters.facet.findIndex(facet => facet.key === key && facet.value === value)

    // Si el filtro existe en el array, elimínalo usando splice
    if (index !== -1) {
      state.filters.facet.splice(index, 1) // Elimina el filtro en el índice encontrado
    }
  },
  removeFilter (state, { type, value }) {
    state.filters[type] = state.filters[type].filter(v => v !== value)
  },
  clearFilters (state) {
    state.filters = {
      facets: []
    }
  }
}

export const actions = {
  updateApiUrl ({ commit }, newUrl) {
    commit('setApiUrl', newUrl)
  },
  updateRepo ({ commit }, newRepo) {
    commit('setRepo', newRepo)
  },
  updateSearch ({ commit }, search) {
    commit('setSearch', search)
  },
  updateModalFacets ({ commit }, active) {
    commit('setModalFacets', active)
  },
  // Agregar un filtro
  addFilter ({ commit }, { type, value }) {
    commit('addFilter', { type, value })
  },
  updateFilterFacet ({ commit, dispatch }, { key, value }) {
    commit('updateFiltersFacet', { key, value })
    dispatch('applyFilters')
  },
  removeFilterFacet ({ commit, dispatch }, { key, value }) {
    commit('removeFiltersFacet', { key, value })
  },
  // Eliminar un filtro
  removeFilter ({ commit }, { type, value }) {
    commit('removeFilter', { type, value })
  },
  // Limpiar todos los filtros
  clearAllFilters ({ commit }) {
    commit('clearFilters')
  },
  // Acción para aplicar filtros y hacer la petición al backend
  async applyFilters ({ getters, commit, dispatch }, filters) {
    try {
      const response = await this.$axios.post(`${getters.apiUrl}/thematic/${getters.siteId}/filtered-data/`, filters)
      commit('setRepo', response.data)
    } catch (error) {
      await dispatch('sendErrorToTeams', {
        error,
        method: 'applyFilters()'
      })
      if (error.response) {
        console.log('Status:', error.response.status)
        console.log('Datos del error:', error.response.data) // Muestra el mensaje de error que envía el servidor
        console.log('Headers:', error.response.headers)
      } else {
        console.error('Error sin respuesta:', error.message)
      }
    }
  },
  async searchData ({ getters, commit, dispatch }, { search, searchIn, facets, page }) {
    try {
      console.log('Facets:', facets)
      const searchTerm = search || ''
      const filtersSearch = {
        facet: facets
      }
      const pageTerm = page
      console.log('Facets:', filtersSearch)
      // eslint-disable-next-line object-shorthand
      const payload = { filters: filtersSearch, search: searchTerm, page: pageTerm, search_in: searchIn }
      const response = await this.$axios.post(`${getters.apiUrl}/thematic/${getters.siteId}/search-data/`, payload)
      console.log('SearData: ', response.data)
      commit('setRepo', response.data)
    } catch (error) {
      await dispatch('sendErrorToTeams', {
        error,
        method: 'searchData()'
      })
      if (error.response) {
        console.log('Status:', error.response.status)
        console.log('Datos del error:', error.response.data) // Muestra el mensaje de error que envía el servidor
        console.log('Headers:', error.response.headers)
      } else {
        console.error('Error sin respuesta:', error.message)
      }
    }
  },
  async fetchDocumentData ({ getters, dispatch }, { id, hasModel, thumbnail, related }) {
    try {
      const payload = { id, has_model: hasModel, thumbnail, related }
      console.log('Document Payload: ' + payload)
      const response = await this.$axios.post(
        `${getters.apiUrl}/thematic/${getters.siteId}/document-data/`, payload,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      console.log('fetchDocumentData: ', response.data)
      return response.data
    } catch (error) {
      await dispatch('sendErrorToTeams', {
        error,
        method: 'fetchDocumentData()'
      })
      console.error('Error fetching document data:', error)
      throw error // Opcional: lanzar error para manejarlo en el componente
    }
  },
  async fetchModalFacetData ({ getters, dispatch }, { facetLabel, facetSort, facetPage, filters, search }) {
    try {
      // Construir el payload de la solicitud
      const payload = {
        facet_label: facetLabel,
        facet_sort: facetSort,
        facet_page: facetPage,
        filters: filters || [], // Puedes enviar un array vacío si no hay filtros
        search: search || ''
      }

      // Hacer la solicitud POST al endpoint
      const response = await this.$axios.post(`${getters.apiUrl}/thematic/${getters.siteId}/facet-data/`, payload)

      // Puedes manejar los datos de la respuesta aquí si es necesario
      console.log('Facet data response:', response.data)

      // Puedes hacer un commit si deseas almacenar la respuesta en el estado
      return response.data
    } catch (error) {
      await dispatch('sendErrorToTeams', {
        error,
        method: 'fetchModalFacetData()'
      })
      console.error('Error al obtener los datos de faceta:', error)
      throw error // Lanza el error para manejarlo en el componente si es necesario
    }
  },
  async fetchMapCoords ({ getters, dispatch }) {
    try {
      const fullUrl = `${getters.apiUrl}/thematic/${getters.siteId}/map_coords/`

      console.log('URL de la solicitud:', fullUrl) // Verifica la URL aquí

      const response = await this.$axios.get(fullUrl)
      console.log('Coords data response:', response.data)
      return response.data
    } catch (error) {
      await dispatch('sendErrorToTeams', {
        error,
        method: 'fetchMapCoords()'
      })
      console.error('Error fetching map coordinates:', error)
      throw error // Opcional: lanzar el error para manejarlo en el componente
    }
  },
  async sendMessage ({ getters, commit, dispatch }, { mail, asunto, mensaje }) {
    try {
      const fullUrl = `${getters.apiUrl}/contact/${getters.siteId}/message/`

      const payload = {
        mail,
        asunto,
        mensaje
      }
      const response = await this.$axios.post(
        fullUrl, payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      // Manejar la respuesta, si es necesario.
      return response.data
    } catch (error) {
      await dispatch('sendErrorToTeams', {
        error,
        method: 'sendMessage()'
      })
      console.error('Error al enviar el mensaje:', error)
      throw error
    }
  },
  async sendErrorToTeams ({ getters }, { error, method }) {
    try {
      const payload = {
        error: error.message || error,
        method,
        sitio: getters.getSitio
      }
      await this.$axios.post('/api/sendErrorToTeams', payload)
    } catch (webhookError) {
      console.error('Error al enviar el mensaje al webhook de Microsoft Teams:', webhookError)
    }
  },
  async getRepoData ({ getters, commit, dispatch }) {
    try {
      const response = await this.$axios.get(getters.apiUrl + '/sites/sites/1/fetch-data')
      commit('setRepo', response.data)
    } catch (error) {
      await dispatch('sendErrorToTeams', {
        error,
        method: 'getRepoData()'
      })
      console.error('Error fetching data:', error)
    }
  },
  async nuxtServerInit ({ dispatch }) {
    await dispatch('getRepoData')
  }
}
