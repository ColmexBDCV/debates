<template>
  <div>
    <div v-if="load_data">
      <div class="text-center">
        {{ label_loading }}
      </div>
      <div class="text-center">
        <b-spinner variant="primary" type="grow" label="Spinning" />
        <b-spinner variant="primary" type="grow" label="Spinning" />
        <b-spinner variant="primary" type="grow" label="Spinning" />
      </div>
    </div>
    <b-row>
      <b-col>
        <l-map
          ref="mapRef"
          :zoom="5"
          :center="[23, -102]"
          :zoom-control="true"
          :scroll-wheel-zoom="true"
          :max-zoom="18"
          style="height: 450px; width: 100%;"
        >
          <l-control-layers position="topright" />
          <l-tile-layer
            v-for="tileProvider in getTileProviders()"
            :key="tileProvider.name"
            :name="tileProvider.name"
            :visible="tileProvider.visible"
            :url="tileProvider.url"
            :attribution="tileProvider.attribution"
            layer-type="base"
          />
        </l-map>
      </b-col>
      <b-col md="4" class="site-list">
        <h5>Lista de Sitios</h5>
        <ul>
          <li v-for="(site, index) in combinedData" :key="index">
            <b @click="show_popup(site)" class="labelshow">{{ site.title_tesim }}</b>
            <div v-for="(label_tesim, index) in site.based_near_label_tesim" :key="index">
              {{ label_tesim }}
            </div>
            <!-- <p>Coordenadas: {{ site.coordinates.map(coord => `(${coord.lat}, ${coord.lng})`).join(', ') }}</p>-->
          </li>
        </ul>
      </b-col>
    </b-row>
    <div>
      <div v-if="dataCoords.data" class="slider-year">
        <p class="mt-5">
          <b> Años mostrados en el mapa: {{ selectedYear[0] }} - {{ selectedYear[1] }} </b>
        </p>
        <VueSlider
          v-model="selectedYear"
          :enable-cross="false"
          :marks="dataCoords.data.years"
          :hide-label="true"
          :min="minYear"
          :max="maxYear"
          :interval="1"
          :data="dataCoords.data.years"
          tooltip="always"
          @change="debouncedYearChange"
        />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MapComponent',
  data () {
    return {
      load_data: true,
      label_loading: 'Cargando Mapa ...',
      selectedYear: [],
      minYear: null,
      maxYear: null,
      iconSize: 34,
      dataCoords: {},
      combinedData: [],
      currentLayer: 'satellite',
      mbAttr: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      mbUrl: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWNpc25lcm9zIiwiYSI6ImNsZ2I4OGZsNjA0Y2YzbXMxYzQxb3pvaGgifQ.Dw_N62BZTbOynrGXwmLEpQ'
    }
  },
  computed: {
    dynamicSize () {
      return [this.iconSize, this.iconSize * 1.15]
    },
    dynamicAnchor () {
      return [this.iconSize / 2, this.iconSize * 1.15]
    }
  },
  watch: {
    dataCoords: {
      handler (newVal) {
        if (newVal.data) {
          this.selectedYear = this.getCentralYears(newVal.data.years)
          this.initializeMap()
          this.minYear = newVal.data.years[0]
          this.maxYear = newVal.data.years[newVal.data.years.length - 1]
        }
      }
    }
  },
  mounted () {
    this.fetchDataCoords()
  },
  created () {
    this.debouncedYearChange = this.$debounce(this.onYearChange, 800)
  },
  methods: {
    combineDataByYear (data, yearsSelected) {
      const allRecords = []
      const [fromYear, toYear] = yearsSelected

      for (let year = fromYear; year <= toYear; year++) {
        const yearData = data.data.data_by_year['year_' + year]
        if (yearData && Array.isArray(yearData)) {
          allRecords.push(...yearData)
        }
      }
      this.combinedData = allRecords
      this.updateMapMarkers() // Actualizar marcadores después de combinar datos
    },
    async fetchDataCoords () {
      try {
        this.label_loading = 'Obteniendo Información del servidor ...'
        const response = await this.$store.dispatch('fetchMapCoords')
        this.dataCoords = response
      } catch (error) {
        console.error('Error fetching map coordinates:', error)
      }
    },
    getCentralYears (years) {
      const totalYears = years.length
      if (totalYears <= 5) {
        return years.slice()
      }

      const middleIndex = Math.floor(totalYears / 2)
      const startIndex = Math.max(0, middleIndex - 2)
      const endIndex = Math.min(totalYears, middleIndex + 3)
      return [years[startIndex], years[endIndex]]
    },
    getTileProviders () {
      return [
        {
          name: 'Satellite',
          visible: true,
          attribution: this.mbAttr,
          url: this.mbUrl.replace('{id}', 'mapbox/satellite-v9')
        },
        {
          name: 'Streets',
          visible: false,
          attribution: this.mbAttr,
          url: this.mbUrl.replace('{id}', 'mapbox/streets-v11')
        },
        {
          name: 'Gray Scale',
          visible: false,
          attribution: this.mbAttr,
          url: this.mbUrl.replace('{id}', 'mapbox/light-v9')
        },
        {
          name: 'OpenStreetMap',
          visible: false,
          attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        },
        {
          name: 'OpenTopoMap',
          visible: false,
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }
      ]
    },
    initializeMap (map) {
      // Almacena el objeto del mapa cuando esté disponible
      this.mapObject = map
      this.initializeMarkerCluster()
    },
    initializeMarkerCluster () {
      this.label_loading = 'Obteniendo coordenadas de Cartillas ...'
      const mapObject = this.$refs.mapRef.mapObject
      if (mapObject) {
        this.mapObject = mapObject
        this.markerCluster = L.markerClusterGroup({
          spiderfyOnMaxZoom: true,
          showCoverageOnHover: true,
          zoomToBoundsOnClick: false,
          disableClusteringAtZoom: 10,
          maxClusterRadius: 0
        })

        this.$refs.mapRef.mapObject.addLayer(this.markerCluster) // Agrega al mapa
        this.combineDataByYear(this.dataCoords, this.selectedYear)
      }
    },
    onYearChange (yearRange) {
      this.load_data = true
      this.selectedYear = yearRange
      this.label_loading = 'Actualizando coordenadas de Cartillas ...'
      this.combineDataByYear(this.dataCoords, this.selectedYear)
    },
    updateMapMarkers () {
      if (this.markerCluster) {
        this.markerCluster.clearLayers()
      }

      this.combinedData.forEach((record, recordIndex) => {
        record.coordinates.forEach((coord, coordIndex) => {
          // Crear un ID único para cada marcador combinando el índice del record y del coordinada
          const markerId = `marker-${recordIndex}-${coordIndex}`
          // Guardar el ID del marcador en el registro
          record.markerId = markerId
          const marker = L.marker([coord.lat, coord.lng], {
            icon: L.icon({
              iconUrl: '/pin_map.png',
              iconSize: this.dynamicSize
            })
          })

          marker.id = markerId
          marker.bindPopup(`
            <a href="/document?id=${record.id}&has_model=${record.has_model_ssim}&thumbnail=${record.thumbnail_path_ss}&related=${record.hasRelatedMediaFragment_ssim}&keyword=">
              <b>${record.title_tesim}</b>
            </a>
            <p>${record.based_near_label_tesim[0]}</p>
          `)
          this.markerCluster.addLayer(marker)
        })
      })
      this.load_data = false
    },
    show_popup (record) {
      const markerId = record.markerId // Obtener el ID del marcador desde record

      // Buscar el marcador en markerCluster por su ID
      const marker = this.markerCluster.getLayers().find(layer => layer.id === markerId)

      if (marker) {
        // Centramos el mapa en el marcador y hacemos un zoom animado
        this.mapObject.flyTo(marker.getLatLng(), 10, {
          animate: true,
          duration: 2
        })

        // Esperamos un momento para abrir el popup después de centrar el mapa
        setTimeout(() => {
          marker.openPopup()
        }, 2200)
      } else {
        console.error(`Marker with ID ${markerId} not found in markerCluster.`)
      }
    }
  }
}
</script>

<style>
.leaflet-container {
  height: 100%;
  width: 100%;
}
.leaflet-marker-shadow {
  transform: none !important;
}
.slider-year {
  margin-top: 5em;
}
.site-list {
    padding: 1em;
    background-color: #f8f9fa;
    border-left: 2px solid #ddd;
    height: 450px;
    overflow-y: auto; /* Agrega el desplazamiento vertical */
}
.labelshow{
    color: var(--bs-collection);
    cursor: pointer;
}
</style>
