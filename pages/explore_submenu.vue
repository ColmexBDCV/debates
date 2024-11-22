<template>
  <div>
    <b-container class="top-margin-page">
      <div>
        <b-row class="mb-2">
          <b-col cols="6" class="pl-5 ml-3 title">
            <h1>Explorar la Colección</h1>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col cols="12" >
            <b-navbar class="text-center justify-content-center">
              <nuxt-link to="/explore" class="nav-link">
                LISTADO COMPLETO
              </nuxt-link>
              <nuxt-link to="/explore/mapexplore" class="nav-link">
                NAVEGAR MAPA
              </nuxt-link>
            </b-navbar>
            <!-- Muestra las subrutas en este componente -->
            <nuxt-child />
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>

</script>

<style>
.title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5em;
  font-weight: lighter;
  color: var(--bs-collection);
}
</style>
