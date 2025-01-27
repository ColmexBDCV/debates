<template>
  <div style="width: 98%">
    <video
      ref="videoPlayer"
      class="video-js"
      controls
      preload="auto"
      style="width: 100%;"
      :src="src"
      :type="type"
    >
      Tu navegador no soporta la reproducción de videos.
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
  props: {
    src: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'video/mp4'
    },
    width: {
      type: [String, Number],
      default: 640
    },
    height: {
      type: [String, Number],
      default: 360
    }
  },
  data () {
    return {
      player: null // Instancia del reproductor Video.js
    }
  },
  mounted () {
    // Inicializar el reproductor Video.js
    this.player = videojs(this.$refs.videoPlayer, {
      controls: true,
      autoplay: false,
      preload: 'auto'
    })
  },
  beforeDestroy () {
    // Destruir el reproductor para evitar fugas de memoria
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
