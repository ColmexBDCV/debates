export default {
  ssr: true,
  router: {
    prefetchLinks: true
  },
  // Enable the loading indicator
  loading: {
    color: '#7b213d', // Customize the color of the loading bar
    height: '5px' // Customize the height of the loading bar
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Debates',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/debates-logo.jpg' }
    ],
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/custom.scss',
    'leaflet/dist/leaflet.css',
    'leaflet.markercluster/dist/MarkerCluster.css',
    'leaflet.markercluster/dist/MarkerCluster.Default.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-i18n.js',
    '~/plugins/initRepo.js',
    '~/plugins/debounce.js',
    { src: '~/plugins/vue2-leaflet.js', mode: 'client' },
    { src: '~/plugins/vue-slider.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'es', name: 'Español', iso: 'es-ES', file: 'es.json' }
    ],
    defaultLocale: 'es', // Establecer el idioma por defecto
    lazy: false, // Carga de traducciones de forma perezosa (lazy load)
    langDir: 'lang/', // Directorio donde se guardan los archivos de idioma
    vueI18n: {
      fallbackLocale: 'es'
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },
  bootstrapVue: {
    icons: true // Habilitar íconos de BootstrapVue
  },
  server: {
    port: 4000,
    host: '0.0.0.0' // permite conexiones desde cualquier IP
  },
  serverMiddleware: [
    { path: '/api', handler: '~/server/index.js' } // Servir API en /api
  ]
}
