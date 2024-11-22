<template>
  <div id="pages-div" style="overflow-x: auto;">
    <nav class="mt-5" aria-label="Páginas disponibles" style="text-align: center;">
      <ul class="pagination">
        <!-- Botón Anterior -->
        <li :class="['page-item', { disabled: localCurrentPage === 1 }]">
          <a class="page-link" href="#" @click.prevent="nextPage(localCurrentPage - 1)">Anterior</a>
        </li>
        <!-- Primera Página y "..." -->
        <li v-if="localCurrentPage > 5" class="page-item" :class="isCurrent(1)">
          <a class="page-link" href="#" @click.prevent="nextPage(1)">1</a>
        </li>
        <li v-if="localCurrentPage > 5" class="page-item disabled">
          <span class="page-link">...</span>
        </li>

        <!-- Páginas visibles -->
        <li v-for="page in visiblePages" :key="page" class="page-item" :class="isCurrent(page)" variant="collection">
          <a class="page-link" href="#" @click.prevent="nextPage(page)">{{ page }}</a>
        </li>

        <!-- "..." y Última Página -->
        <li v-if="pages.total_pages > 10 && localCurrentPage < pages.total_pages - 5" class="page-item disabled">
          <span class="page-link">...</span>
        </li>
        <li v-if="pages.total_pages > 1" class="page-item" :class="isCurrent(pages.total_pages)">
          <a class="page-link" href="#" @click.prevent="nextPage(pages.total_pages)">{{ pages.total_pages }}</a>
        </li>

        <!-- Botón Siguiente -->
        <li :class="['page-item', { disabled: localCurrentPage === pages.total_pages }]">
          <a class="page-link" href="#" @click.prevent="nextPage(localCurrentPage + 1)">Siguiente</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    pages: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      localCurrentPage: parseInt(this.$route.query.page) || this.pages.current_page || 1
    }
  },
  computed: {
    // Definición de las páginas visibles
    visiblePages () {
      const totalVisible = 8
      let startPage = Math.max(1, this.localCurrentPage - Math.floor(totalVisible / 2))
      const endPage = Math.min(parseInt(this.pages.total_pages), startPage + totalVisible - 1)

      // Ajuste para asegurar que siempre se muestren el totalVisible número de páginas
      if (endPage - startPage + 1 < totalVisible) {
        startPage = Math.max(1, endPage - totalVisible + 1)
      }
      console.log(Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i))

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    }
  },
  watch: {

  },
  methods: {
    isCurrent (page) {
      return page === this.localCurrentPage ? 'active' : ''
    },
    nextPage (page) {
      if (page !== this.localCurrentPage) {
        this.localCurrentPage = page
        this.$router.push({ query: { ...this.$route.query, page } })
        // this.updateData()
      }
    },
    updateData () {
      this.$store.dispatch('searchData', {
        filters: this.$route.query.filters || [],
        search: this.$route.query.search || '',
        page: this.localCurrentPage
      })
    }
  }
}
</script>
