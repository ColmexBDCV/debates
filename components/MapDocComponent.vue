<template>
  <div class="">
    <l-map
      :zoom="5"
      :center="[23, -102]"
      :zoom-control="true"
      :scroll-wheel-zoom="true"
      style="height: 400px; width: 90%;"
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
      <template v-if="dataCoords.data">
        <div v-for="(record, index) in combinedData" :key="index">
          <l-marker
            v-for="(coord, coordIndex) in record.coordinates"
            :key="`${index}-${coordIndex}`"
            :lat-lng="[coord.lat, coord.lng]"
          >
            <l-icon
              :icon-size="dynamicSize"
              :icon-anchor="dynamicAnchor"
              icon-url="/pin_map.png"
            />
            <l-popup>
              <b-link
                :to="{
                  path: 'document',
                  query: {
                    id: record.id,
                    has_model: record.has_model_ssim,
                    thumbnail: record.thumbnail_path_ss,
                    related: record.hasRelatedMediaFragment_ssim,
                    keyword: '',
                  },
                }"
              >
                <b>{{ record.title_tesim }}</b>
              </b-link>
              <p>{{ record.based_near_label_tesim[coordIndex] }}</p>
            </l-popup>
          </l-marker>
        </div>
      </template>
    </l-map>
  </div>
</template>

<script>

export default {
  name: 'MapDocComponent',
  props: {
    id_search: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
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
          this.combineDataByYear(newVal)
        }
      }
    }
  },
  mounted () {
    this.fetchDataCoords()
  },
  methods: {
    async fetchDataCoords () {
      try {
        const response = await this.$store.dispatch('fetchMapCoords')
        this.dataCoords = response
      } catch (error) {
        console.error('Error fetching map coordinates:', error)
      }
    },
    combineDataByYear (data) {
      const allRecords = []
      const recordMatch = []
      data.data.years.forEach((year) => {
        const yearData = data.data.data_by_year['year_' + year]
        if (yearData && Array.isArray(yearData)) {
          yearData.forEach((item) => {
            if (item.id === this.id_search) {
              recordMatch.push(item)
            }
          })
          allRecords.push(...recordMatch)
        }
      })
      this.combinedData = allRecords
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
          attribution:
                    '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        },
        {
          name: 'OpenTopoMap',
          visible: false,
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution:
                    'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }
      ]
    }
  }
}
</script>

<style>
/* Este estilo asegura que los íconos de Leaflet se muestren correctamente */
.leaflet-container {
    height: 100%;
    width: 100%;
}
.leaflet-marker-shadow{
    transform: none !important;
}
.slider-year{
  margin-top: 5em
}
</style>
