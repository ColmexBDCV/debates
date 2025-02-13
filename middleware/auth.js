export default async function ({ redirect, app, store }) {
  if (!store.state.auth.user) {
    try {
      // Verificar la autenticación con el backend
      await store.dispatch('auth/login')
    } catch (error) {
      return redirect('/login')
    }
  }
}
