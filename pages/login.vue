<template>
  <b-container class="mt-5">
    <b-row>
      <b-col cols="12" md="6" class="mx-auto">
        <b-card>
          <h1 class="text-center">Login</h1>
          <b-form @submit.prevent="handleLogin">
            <b-form-group label="Username" label-for="username">
              <b-form-input
                id="username"
                v-model="form.username"
                type="text"
                placeholder="Enter your username"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password" label-for="password">
              <b-form-input
                id="password"
                v-model="form.password"
                type="password"
                placeholder="Enter your password"
                required
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" block>Login</b-button>
          </b-form>
          <b-alert
            v-if="error"
            variant="danger"
            show
            dismissible
            class="mt-3"
          >
            {{ error }}
          </b-alert>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async handleLogin () {
      try {
        const response = await this.$store.dispatch('auth/login', {
          user: this.form.username,
          pass: this.form.password
        })
        //console.log(response.data)
        //const { accessToken } = response.data.token

        // Guarda el token en localStorage
        //localStorage.setItem('jwt', accessToken)

        // Redirige al dashboard
        this.$router.push('/admin/dashboard')
      } catch (error) {
        this.error = error.response?.data?.detail || 'Login failed. Please try again.'
      }
    }
  }
}
</script>

<style scoped>
/* Agrega estilos específicos si lo necesitas */
</style>
