export default function ({ redirect, app }) {
  console.log('middleware ejecutado')

  // Si el middleware se ejecuta en el servidor
  if (process.server) {
    console.log('Ejecución en el servidor. No hay acceso a localStorage.')
    return
  }

  // Si el middleware se ejecuta en el cliente
  if (process.client) {
    console.log('Ejecución en el cliente. Verificando localStorage...')
    const token = localStorage.getItem('jwt')
    console.log('Token encontrado:', token)

    if (!token) {
      console.log('Token no encontrado. Redirigiendo al login...')
    }
  }
}
