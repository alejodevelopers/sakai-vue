<template>
  <div>
    <!-- Reproductor de audio -->
    <audio ref="audioElement"></audio>
    <!-- Botones para cambiar de canción -->
    <div>
      <button
        v-for="(song, index) in songs"
        :key="index"
        @click="changeSong(index)"
      >
        {{ song.title }}
      </button>
    </div>
  </div>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import { useMediaControls } from "@vueuse/core";

export default {
  setup() {
    const audioElement = ref(null);
    const songs = [
      { title: "Canción 1", src: "/video/mentepositiva.mp3" },
      { title: "Canción 2", src: "/video/poposote.mp3" },
    ];
    let currentSongIndex = 0;

    // Obtener las referencias a las propiedades del reproductor de medios
    const { playing, currentTime, duration, volume, tracks, enableTrack } =
      useMediaControls(audioElement);

    // Función para cambiar de canción
    const changeSong = (index) => {
      currentSongIndex = index;
      const selectedSong = songs[currentSongIndex];
      const audio = audioElement.value;

      // Cambiar el src de la etiqueta de audio y reproducir la nueva canción
      if (audio) {
        audio.src = selectedSong.src;
        audio.load(); // Cargar la nueva canción
        audio.play(); // Reproducir la nueva canción
      }

      // Habilitar la pista de texto correspondiente si es necesario
      enableTrack(index);
    };

    // Ejecutar acciones adicionales después de cargar el componente
    onMounted(() => {
      // Iniciar la reproducción de la primera canción
      changeSong(currentSongIndex);
    });

    return {
      audioElement,
      songs,
      playing,
      currentTime,
      duration,
      volume,
      changeSong,
    };
  },
};
</script>