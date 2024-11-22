<template>
  <div class="loading-spinner">
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.loading-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}
</style>
