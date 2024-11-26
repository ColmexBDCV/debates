<template>
  <b-container class="mt-5">
    <h1>Dashboard</h1>

    <!-- Información del sitio -->
    <b-card class="mt-3">
      <b-card-header>
        <h3>Información del Sitio</h3>
      </b-card-header>
      <b-card-body>
        <b-row>
          <b-col cols="12" md="6">
            <b-card-text>
              <b-badge variant="primary">
                Nombre del sitio
              </b-badge>
              <p class="font-weight-bold">
                {{ siteData.name }}
              </p>
            </b-card-text>
          </b-col>
          <b-col cols="12" md="6">
            <b-card-text>
              <b-badge variant="success">
                Colección Temática
              </b-badge>
              <p class="font-weight-bold">
                {{ siteData.collection }}
              </p>
            </b-card-text>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <!--
    <b-card class="mt-3">
      <b-card-header>
        <h3>Filtros en listado (Explorar)</h3>
      </b-card-header>
      <b-card-body>
        <b-table
          :items="paginatedFieldFilters"
          :fields="fieldFields"
          responsive="sm"
        >
          <template #cell(active)="row">
            <b-form-checkbox
              :checked="row.item.active"
              @change="handleToggleFieldFilter(row.item.id, row.item.active)"
            >
              {{ row.item.active ? 'Activo' : 'Inactivo' }}
            </b-form-checkbox>
          </template>
        </b-table>

        <b-pagination
          v-model="currentFieldPage"
          :total-rows="fieldFilters.length"
          :per-page="perPage"
          align="center"
          class="mt-3"
        />
      </b-card-body>
    </b-card>

    <b-card class="mt-3">
      <b-card-header>
        <h3>Filtros de Registro (Detalle Registro)</h3>
      </b-card-header>
      <b-card-body>
        <b-table
          :items="paginatedArticleFilters"
          :fields="articleFields"
          responsive="sm"
        >
          <template #cell(active)="row">
            <b-form-checkbox
              :checked="row.item.active"
              @change="handleToggleArticleFilter(row.item.id, row.item.active)"
            >
              {{ row.item.active ? 'Activo' : 'Inactivo' }}
            </b-form-checkbox>
          </template>
        </b-table>

        <b-pagination
          v-model="currentArticlePage"
          :total-rows="articleFilters.length"
          :per-page="perPage"
          align="center"
          class="mt-3"
        />
      </b-card-body>
    </b-card> -->
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'admin',
  data () {
    return {
      fieldFields: [
        { key: 'filter_key', label: 'Filtro', sortable: true },
        { key: 'active', label: 'Estado', sortable: false }
      ], // Configuración de las columnas de la tabla de filtros
      articleFields: [
        { key: 'filter_key', label: 'Filtro', sortable: true },
        { key: 'active', label: 'Estado', sortable: false }
      ], // Configuración de las columnas de la tabla de filtros de artículos
      currentFieldPage: 1, // Página actual para filtros por registro
      currentArticlePage: 1, // Página actual para filtros de artículos
      perPage: 10 // Filtros por página
    }
  },
  computed: {
    ...mapGetters('dashboard', ['siteData', 'fieldFilters', 'articleFilters']),
    paginatedFieldFilters () {
      // Retorna los filtros por registro correspondientes a la página actual
      const start = (this.currentFieldPage - 1) * this.perPage
      const end = start + this.perPage
      return this.fieldFilters.slice(start, end).map(filter => ({
        ...filter,
        filter_key: this.$t(`${filter.filter_key}`) || filter.filter_key
      }))
    },
    paginatedArticleFilters () {
      // Retorna los filtros de artículos correspondientes a la página actual
      const start = (this.currentArticlePage - 1) * this.perPage
      const end = start + this.perPage
      return this.articleFilters.slice(start, end).map(filter => ({
        ...filter,
        filter_key: this.$t(`${filter.filter_key}`) || filter.filter_key
      }))
    }
  },
  async mounted () {
    const token = localStorage.getItem('jwt') // Siempre accesible en el cliente
    if (!token) {
      console.log('Token no encontrado. Redirigiendo al login...')
      this.$router.push('/login') // Redirige al login
    }

    try {
      // Carga los datos del sitio, los filtros por registro y los filtros de artículos
      await this.fetchSiteData()
      await this.fetchFieldFilters()
      await this.fetchArticleFilters()
    } catch (error) {
      console.error('Error loading site data or filters:', error)
    }
  },
  methods: {
    logout () {
      // Elimina el token y redirige al login
      localStorage.removeItem('jwt')
      this.$router.push('/login')
    },
    ...mapActions('dashboard', [
      'fetchSiteData',
      'fetchFieldFilters',
      'toggleFieldFilter',
      'fetchArticleFilters',
      'toggleArticleFilter'
    ]),
    async handleToggleFieldFilter (id, currentStatus) {
      const userId = 1 // ID de usuario fijo
      try {
        await this.toggleFieldFilter({ id, userId }) // Llama a la acción toggleFieldFilter
      } catch (error) {
        console.error(`Error toggling field filter with ID ${id}:`, error)
      }
    },
    async handleToggleArticleFilter (id, currentStatus) {
      const userId = 1 // ID de usuario fijo
      try {
        await this.toggleArticleFilter({ id, userId }) // Llama a la acción toggleArticleFilter
      } catch (error) {
        console.error(`Error toggling article filter with ID ${id}:`, error)
      }
    }
  }
}
</script>

<style scoped>
/* Agrega estilos específicos si lo necesitas */
</style>
