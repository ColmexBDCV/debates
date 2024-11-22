import Vue from 'vue'
import { LMap, LTileLayer, LMarker, LPopup, LControlLayers, LIcon } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

if (process.client) {
  const L = require('leaflet') // Usamos require en lugar de import para evitar el problema SSR
  require('leaflet.markercluster') // Aseguramos que markercluster solo se importe en el cliente

  // Configuración de iconos si es necesario (soluciona problemas con rutas de imágenes en Leaflet)
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  })

  Vue.component('LMap', LMap)
  Vue.component('LTileLayer', LTileLayer)
  Vue.component('LMarker', LMarker)
  Vue.component('LPopup', LPopup)
  Vue.component('LControlLayers', LControlLayers)
  Vue.component('LIcon', LIcon)
}
