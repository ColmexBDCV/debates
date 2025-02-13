export const state = () => ({
  fieldFilters: [], // Datos de los filtros
  siteData: {}, // Aquí se almacenarán los datos del endpoint
  articleFilters: [],
  repo: ''
})

export const mutations = {
  setFieldFilters (state, filters) {
    state.fieldFilters = filters // Actualiza los filtros en el estado
  },
  updateFilterStatus (state, { id, active }) {
    // Actualiza localmente el estado del filtro
    const filter = state.fieldFilters.find(filter => filter.id === id)
    if (filter) {
      filter.active = active
    }
  },
  setSiteData (state, data) {
    state.siteData = data // Actualiza los datos del sitio en el estado
  },
  setArticleFilters (state, filters) {
    state.articleFilters = filters // Actualiza los filtros en el estado
  },
  updateArticleFilterStatus (state, { id, active }) {
    // Actualiza localmente el estado del filtro
    const filter = state.articleFilters.find(filter => filter.id === id)
    if (filter) {
      filter.active = active
    }
  },
  setRepo (state, newRepo) {
    state.repo = newRepo
  }
}

export const actions = {
  async fetchSiteData ({ commit, rootState, dispatch }) {
    try {
      const response = await this.$axios.get(`${rootState.apiUrl}/sites/sites/${rootState.siteId}`) // Cambia la URL si es necesario
      commit('setSiteData', response.data) // Guarda los datos en el estado
    } catch (error) {
      await dispatch('sendErrorToTeams', {
        error,
        method: 'fetchSiteData()'
      },
      { root: true })
      console.error('Error al enviar el mensaje:', error)
      throw error
    }
  },
  async fetchFieldFilters ({ commit, rootState }) {
    try {
      const response = await this.$axios.get(`${rootState.apiUrl}/field_filters/sites/${rootState.siteId}/field_filters/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      commit('setFieldFilters', response.data) // Guarda los filtros en el estado
    } catch (error) {
      console.error('Error fetching field filters:', error)
      throw error
    }
  },
  async toggleFieldFilter ({ commit, rootState }, { id, userId }) {
    try {
      const response = await this.$axios.put(`${rootState.apiUrl}/field_filters/field_filters/${id}/toggle/?user_id=${userId}`)
      commit('updateFilterStatus', { id, active: response.data.active }) // Actualiza el estado localmente
    } catch (error) {
      console.error(`Error toggling filter with ID ${id}:`, error)
      throw error
    }
  },
  async fetchArticleFilters ({ commit, rootState }) {
    try {
      const response = await this.$axios.get(`${rootState.apiUrl}/article_filters/${rootState.siteId}/article_filters/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      commit('setArticleFilters', response.data) // Guarda los datos en el estado
    } catch (error) {
      console.error('Error fetching article filters:', error)
      throw error
    }
  },
  async toggleArticleFilter ({ commit, rootState }, { id, userId }) {
    try {
      const response = await this.$axios.put(`${rootState.apiUrl}/article_filters/${id}/toggle/?user_id=${userId}`)
      commit('updateArticleFilterStatus', { id, active: response.data.active }) // Actualiza el estado localmente
    } catch (error) {
      console.error(`Error toggling article filter with ID ${id}:`, error)
      throw error
    }
  },
  async getRepoDataAdmin ({ getters, commit, dispatch, rootState }) {
    try {
      const response = await this.$axios.get(`${rootState.apiUrl}/sites/sites/1/fetch-data`)
      commit('setRepo', response.data)
    } catch (error) {
      await dispatch('sendErrorToTeams', {
        error,
        method: 'getRepoDataAdmin()'
      },
      { root: true })
      console.error('Error fetching data:', error)
    }
  },
  // Obtiene los metadatos asociados a un registro
  async fetchMetadataSite ({ commit, rootState }, { idRegistro }) {
    try {
      const idSite = rootState.siteId
      const payload = {
        id_site: idSite,
        id_registro: idRegistro
      }
      const response = await this.$axios.post(`${rootState.apiUrl}/metadatasite/metadataregister`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return response.data // Devuelve los datos de la API
    } catch (error) {
      console.error('Error fetching metadata site:', error)
      throw error // Lanza el error para manejarlo en el componente si es necesario
    }
  },
  async fetchMetadataSiteEdit ({ commit, rootState }, { idRegistro }) {
    try {
      const response = await this.$axios.get(`${rootState.apiUrl}/metadatasite/${idRegistro}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return response.data // Devuelve los datos de la API
    } catch (error) {
      console.error('Error fetching metadata site:', error)
      throw error // Lanza el error para manejarlo en el componente si es necesario
    }
  },
  // Obtiene todos los metadatos existentes del sitio
  async fetchMetadata ({ commit, rootState }) {
    try {
      const response = await this.$axios.get(`${rootState.apiUrl}/metadata/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return response.data // Devuelve los datos de la API
    } catch (error) {
      console.error('Error fetching metadata site:', error)
      throw error // Lanza el error para manejarlo en el componente si es necesario
    }
  },
  async deleteMetadata ({ commit, rootState }, metadataId) {
    try {
      await this.$axios.$delete(`${rootState.apiUrl}/metadata/${metadataId}`)
    } catch (error) {
      console.error('Error deleting metadata site:', error)
      throw error
    }
  }
}

export const getters = {
  siteData (state) {
    return state.siteData // Retorna los datos del sitio
  },
  fieldFilters (state) {
    return state.fieldFilters
  },
  articleFilters (state) {
    return state.articleFilters
  }
}
