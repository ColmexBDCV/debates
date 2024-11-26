<template>
  <div id="wrapper" class="d-flex">
    <!-- Botón de Toggle -->
    <button
      class="btn btn-primary toggle-btn"
      @click="toggleSidebar"
      :class="{ 'toggle-btn-shift': isSidebarOpen }"
    >
      ☰
    </button>

    <!-- Sidebar -->
    <div
      id="sidebar"
      class="sidebar bg-dark text-light"
      :class="{ 'sidebar-open': isSidebarOpen }"
    >
      <nav>
        <div class="mt-3">
          <strong>Administrar Sitio</strong>
        </div>
        <nuxt-link to="/admin/dashboard" class="nav-link text-light">
          Información General
        </nuxt-link>
        <nuxt-link to="/admin/filters/field" class="nav-link text-light">
          Filtros Explorar
        </nuxt-link>
        <nuxt-link to="/admin/filters/article" class="nav-link text-light">
          Filtros Registro
        </nuxt-link>
        <nuxt-link to="/admin/metadata/metadatasite" class="nav-link text-light">
          Metadatos Personalizados
        </nuxt-link>
        <nuxt-link to="/admin/metadata/metadataname/metadatanames" class="nav-link text-light">
          Lista de Metadatos
        </nuxt-link>
        <nuxt-link to="/logout" class="nav-link text-light">Logout</nuxt-link>
      </nav>
    </div>

    <!-- Contenido principal -->
    <div class="flex-grow-1 main-content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSidebarOpen: true // Estado para controlar si el sidebar está abierto o cerrado
    }
  },
  methods: {
    toggleSidebar () {
      this.isSidebarOpen = !this.isSidebarOpen // Alterna el estado del sidebar
    }
  }
}
</script>

<style scoped>
/* Wrapper principal */
#wrapper {
  display: flex;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  background-color: #343a40;
  color: white;
  overflow-y: auto;
  transform: translateX(-250px); /* Oculto por defecto */
  transition: transform 0.3s ease;
}

/* Sidebar abierto */
.sidebar-open {
  transform: translateX(0); /* Visible cuando está abierto */
}

/* Botón de toggle */
.toggle-btn {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1001; /* Asegura que esté por encima del contenido */
  transition: left 0.3s ease; /* Transición suave para el movimiento */
}

/* Botón movido cuando el sidebar está abierto */
.toggle-btn-shift {
  left: 265px; /* Se desplaza al lado del sidebar */
}

/* Contenido principal */
.main-content {
  flex-grow: 1;
  margin-left: 250px; /* Ajusta el contenido para que no se encime con el sidebar */
  overflow-y: auto;
  background-color: #f8f9fa;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

/* Ajusta el contenido cuando el sidebar está cerrado */
.sidebar-open ~ .main-content {
  margin-left: 250px;
}
</style>
