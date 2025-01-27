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
        <div class="mt-3 title-nav">
          <strong>Administrar Sitio</strong>
        </div>

        <!-- Opción con submenú -->
        <div>
          <nuxt-link
            to="/admin/dashboard"
            class="nav-link text-light"
            :class="{ active: isActive('/admin/dashboard') }"
          >
            Inicio
          </nuxt-link>
        </div>

        <!-- Submenú -->
        <div>
          <a
            href="#"
            class="nav-link text-light"
            @click.prevent="toggleSubMenu('filters')"
          >
            Vistas
          </a>
          <ul v-show="true" class="submenu">
            <li>
              <nuxt-link
                to="/admin/filters/field"
                class="nav-link text-light"
                :class="{ active: isActive('/admin/filters/field') }"
              >
                Vista de "Explorar"
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/admin/filters/article"
                class="nav-link text-light"
                :class="{ active: isActive('/admin/filters/article') }"
              >
                Vista de Registro
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Metadatos -->
        <div>
          <a
            href="#"
            class="nav-link text-light"
            @click.prevent="toggleSubMenu('filters')"
          >
            Metadatos Personalizados
        </a>
        </div>

        <div>
          <ul v-show="true" class="submenu">
            <li>
              <nuxt-link
                to="/admin/metadata/metadataname/metadatanames"
                class="nav-link text-light"
                :class="{ active: isActive('/admin/metadata/metadataname/metadatanames') }"
              >
                Administrar Metadatos
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/admin/metadata/metadatasite"
                class="nav-link text-light"
                :class="{ active: isActive('/admin/metadata/metadatasite') }"
              >
                Editar Recursos
          </nuxt-link>
            </li>
          </ul>
        </div>

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
      isSidebarOpen: true, // Estado del sidebar
      activeSubMenu: null // Estado para controlar submenús abiertos
    }
  },
  methods: {
    toggleSidebar () {
      this.isSidebarOpen = !this.isSidebarOpen // Alterna el sidebar
    },
    toggleSubMenu (menu) {
      this.activeSubMenu = this.activeSubMenu === menu ? null : menu // Alterna submenús
    },
    isActive (route) {
      return this.$route.path === route // Determina si la ruta actual es activa
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

.submenu {
  list-style: none;
  margin: 0;
  padding: 0 0 0 15px;
}

/* Opción activa */
.nav-link.active {
  font-weight: bold;
  background-color: #495057;
}

.title-nav{
  border-bottom: solid 2px #FFFFFF;
  text-align: center;
  text-transform: uppercase;
  padding: 0.5em;
  margin-bottom: 2em;
}
</style>
