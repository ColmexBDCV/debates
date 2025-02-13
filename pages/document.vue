<template>
  <div class="bg-pages docpage">
    <b-container class="mt-4">
      <div class="button-docs mb-3">
        <b-button
          v-if="keyword && !back_maps"
          variant="link"
          :to="'/search?keyword=' + keyword"
        >
          <b-icon icon="arrow-left" /> {{ $t('back_docs') }}
        </b-button>
      </div>

      <!-- Datos del documento -->
      <b-row>
         <!-- Contenedor para el visualizador de PDF -->
         <b-col cols="12" class="">
          <iframe
            v-if="has_model !== 'Video'"
            id="pdf_iframe"
            src="/web/viewer.html#zoom=auto"
            width="98%"
            height="600px"
          />
          <VideoPlayer
            v-else-if="has_model === 'Video'"
            :src="pdfUrl"
            width="98%"
            height="600"
          />
          <!--<video :src="pdfUrl" controls width="98%" autoplay type="video/mp4">
              Tu navegador no soporta la reproducción de videos.
          </video>-->
          <!-- Imagen de miniatura o botón de descarga -->
          <!-- <b-img v-if="!related" :src="get_url() + thumbnail" fluid />
          <b-button v-if="related" variant="primary" :href="`${get_url()}downloads/${related}`">
            <b-icon icon="download" /> {{ $t('down_label') }}
          </b-button> -->
        </b-col>
      </b-row>
      <b-row>
        <!-- Titulo  -->
        <div v-if="Object.keys(doc).length">
          <b-col cols="12" md="12" class="title mb-1">
            {{ $t(doc.title[0]) }}
          </b-col>
        </div>
      </b-row>
      <b-row v-if="Object.keys(doc).length" class="mb-3 pb-3">
        <b-col cols="12" md="8">
          <div>
            <b-row v-for="(metadata, key) in doc.iterables" :key="key" class="mb-2 align-items-center">
              <b-col cols="12" md="12" sm="8" class="text-muted font-weight-bold">
                {{ $t(key) }}
              </b-col>
              <b-col cols="12" md="12" sm="8">
                <div v-if="Array.isArray(metadata)">
                  <div v-for="(item, index) in metadata" :key="index">
                    <b-link v-if="key === 'handle'" :href="item" target="_blank">
                      {{ item }}
                    </b-link>
                    <span v-else>{{ item }}</span>
                  </div>
                </div>
                <div v-else>
                  <b-link v-if="key === 'handle'" :href="metadata" target="_blank">
                    {{ metadata }}
                  </b-link>
                  <span v-else>{{ metadata }}</span>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col cols="12">
          <div class="text-center">
            <div class="text-center">
              {{ label_loading }}
            </div>
            <div class="text-center">
              <b-spinner variant="primary" type="grow" label="Spinning" />
              <b-spinner variant="primary" type="grow" label="Spinning" />
              <b-spinner variant="primary" type="grow" label="Spinning" />
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="Object.keys(doc).length">
        <b-col class="mb-5 pb-5">
          <MapDocComponent :id_search="id" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'DocumentView',
  data () {
    return {
      label_loading: 'Obteniendo Informacion del registro',
      doc: {},
      keyword: '',
      search_in: 'all_fields',
      search: '',
      url_share: '',
      pdfUrl: ''
    }
  },
  computed: {
    id () {
      return Array.isArray(this.$route.query.id) ? this.$route.query.id[0] : this.$route.query.id
    },
    has_model () {
      return Array.isArray(this.$route.query.has_model) ? this.$route.query.has_model[0] : this.$route.query.has_model
    },
    thumbnail () {
      return Array.isArray(this.$route.query.thumbnail) ? this.$route.query.thumbnail[0] : this.$route.query.thumbnail
    },
    related () {
      return Array.isArray(this.$route.query.related) ? this.$route.query.related[0] : this.$route.query.related
    }
  },
  watch: {
    '$route.query': {
      handler () {
        this.fetchDocumentData()
      },
      immediate: true
    },
    pdfUrl (newUrl) {
      if (newUrl && this.has_model !== 'Video') {
        this.waitForIframeLoad()
      }
    }
  },
  created () {
    this.fetchDocumentData()
  },
  mounted () {
    // this.loadPdf()
  },
  methods: {
    async fetchDocumentData () {
      try {
        const documentData = await this.$store.dispatch('fetchDocumentData', {
          id: this.id,
          hasModel: this.has_model,
          thumbnail: this.thumbnail,
          related: this.related
        })
        this.doc = documentData.data || {}
        this.url_share = `?id=${this.id}&has_model=${this.has_model}&thumbnail=${this.thumbnail}&related=${this.related}`
        this.pdfUrl = `${documentData.site.base_url}downloads/${this.related}`
        // this.pdfUrl = `${documentData.site.base_url}${this.doc.videos[0].src}`
        console.log('PDF url:', this.pdfUrl)
        console.log('Datos recibidos:', this.doc.iterables)
      } catch (error) {
        console.error('Error al obtener los datos del documento:', error)
      }
    },
    waitForIframeLoad () {
      const iframe = document.getElementById('pdf_iframe')
      if (iframe.contentWindow && iframe.contentWindow.PDFViewerApplication) {
        this.loadPdf()
      } else {
        // Reintenta después de 100ms si el `iframe` aún no ha cargado
        setTimeout(this.waitForIframeLoad, 100)
      }
    },
    loadPdf () {
      const iframe = document.getElementById('pdf_iframe')
      try {
        if (this.pdfUrl) {
          iframe.contentWindow.PDFViewerApplication.open(this.pdfUrl)
        }
      } catch (error) {
        console.error('Error loading PDF:', error)
      }
    },
    get_url () {
      return this.$store.getters['principal/base_url']
    },
    filter_key (metadata, key) {
      return metadata && (Array.isArray(metadata) ? metadata.length > 0 : metadata !== '') && key !== 'restricted_field'
    }
  }
}
</script>

<style scoped>
.bg-pages {
  background-color: #f8f9fa;
}
.button-docs {
  margin-top: 3em;
  margin-bottom: 3em;
}
.docpage {
  margin-top: 6em;
}
.title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5em;
  font-weight: lighter;
  color: var(--bs-collection);
}
</style>
