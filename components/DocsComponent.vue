<template>
  <div>
    <b-row
      v-for="doc in docs"
      :key="doc.id"
      class="mb-4 pl-0 doc-item pt-3 pb-3"
    >
      <!-- Imagen del documento -->
      <b-col cols="12" md="3" class="text-left mb-3 mb-md-0">
        <b-link
          :to="{
            path: 'document',
            query: {
              id: doc.id,
              has_model: doc.has_model,
              thumbnail: doc.thumbnail_path_ss,
              related: doc.hasRelatedMediaFragment,
              keyword: keyword,
            },
          }"
        >
          <b-img
            fluid
            :src="get_url() + doc.thumbnail_path_ss"
            alt="Documento"
            class="img-thumbnail"
          />
        </b-link>
      </b-col>

      <!-- Título y Metadatos del documento -->
      <b-col cols="12" md="6" class="mb-3 mb-md-0">
        <!-- Título del documento -->
        <b-link
          :to="{
            path: 'document',
            query: {
              id: doc.id,
              has_model: doc.has_model,
              thumbnail: doc.thumbnail_path_ss,
              related: doc.hasRelatedMediaFragment,
              keyword: keyword,
            },
          }"
        >
          <h5 class="font-weight-bold">
            {{ doc.title[0] }}
          </h5>
        </b-link>

        <!-- Iteración de metadatos -->
        <b-row
          v-for="(metadata, key, index) in doc.iterables"
          :key="index"
          class="metadata-item"
        >
          <!-- Título del metadato -->
          <b-col cols="12" md="4" class="font-weight-bold mb-1">
            <div class="td-title">
              {{ $t(key) }}:
            </div>
          </b-col>

          <!-- Valor del metadato -->
          <b-col cols="12" md="8" class="mb-3 mb-md-0">
            <div v-if="isObject(metadata)" style="text-align: left;">
              <div v-for="m in metadata.slice(0, 1)" :key="m" class="text-break">
                {{ m }}
              </div>
            </div>
            <div v-else style="text-align: left;">
              <div class="text-break">
                {{ metadata }}
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>

      <!-- Botón Ver Más -->
      <b-col cols="12" md="3" class="text-right d-flex justify-content-center align-items-center">
        <b-button variant="collection" class="ver-mas-button" @click="verMas(doc)">
          Ver más
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'DocsComponent',
  props: {
    docs: {
      type: Array,
      required: true
    },
    baseurl: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    get_url () {
      return this.baseurl
    },
    verMas (doc) {
      this.$router.push({
        path: 'document',
        query: {
          id: doc.id,
          has_model: doc.has_model,
          thumbnail: doc.thumbnail_path_ss,
          related: doc.hasRelatedMediaFragment,
          keyword: this.keyword
        }
      })
    },
    isObject (o) {
      return typeof o === 'object'
    },
    check_metadata (metadata, key) {
      if (typeof metadata === 'object') {
        return metadata && metadata.length > 0
      }
      return metadata !== ''
    }
  }
}
</script>

<style scoped>
.doc-item {
  background-color: #f8f9fa; /* Fondo claro */
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.doc-item h5 {
  color: #343a40;
}

.doc-item .img-thumbnail {
  text-align: center;
  height: 200px;
}

.ver-mas-button {
  background-color: var(--bs-collection); /* Color del botón "Ver más" */
  color: #ffffff;
  border: none;
  width: 10em;
  border-radius: 30px;
}

.ver-mas-button:hover {
  background-color: #612d3dc1;
}

.metadata-item .td-title {
  font-weight: bold;
  color: #343a40;
}

.metadata-item {
  height: auto;
}

@media (max-width: 766px) {
  .text-right {
    text-align: left !important;
  }
  .doc-item .img-thumbnail {
    text-align: center;
    height: 400px;
  }
  .doc-item {
    background-color: #F4F4F4;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0);
}
}
</style>
