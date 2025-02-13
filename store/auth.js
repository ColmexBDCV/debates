export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  CLEAR_USER (state) {
    state.user = null
  }
}

export const actions = {
  async login ({ commit }, { user, pass }) {
    const payload = {
      username: user,
      password: pass
    }
    const response = await this.$axios.post('/api/login', payload)
    commit('SET_USER', response.data) // Guardar datos del usuario
  },
  async logout ({ commit }) {
    try {
      console.log('Cerrando Sesion')
      await this.$axios.post('/api/logout')
      commit('CLEAR_USER') // Limpiar el estado del usuario
      console.log('Limpiando datos')
    } catch (error) {
      console.error('Error en auth(logout):', error)
    }
  }
}
