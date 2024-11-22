<template>
  <div class="main-background">
    <!-- <img src="/debates_v3.jpg" alt="Background" class="background-image">-->
    <div class="gradient">
      <b-container class="d-flex justify-content-center align-items-center text-center fill-height">
        <InicioComponent />
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexComponent'
}
</script>

<style scope>
.main-background {
  background-image: url('/debates.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
