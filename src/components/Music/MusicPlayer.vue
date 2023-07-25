<template>
  <div class="music-player-footer">
    <div class="music-player-container">
      <div class="music-player-content">
        <div class="music-player-album-art">
          <!-- Icono del álbum de la canción actual -->
          <img src="https://i.scdn.co/image/ab67616d0000b273c86d01b827c542a230d609cf" alt="Album Art" />
        </div>
        <div class="music-player-info">
          <!-- Información de la canción actual -->
          <span class="music-player-song-title">Nombre de la canción</span>
          <span class="music-player-artist">Artista</span>
        </div>
      </div>
      <div class="music-player-controls">
        <!-- Controles del reproductor -->
        <button class="p-button p-button-outlined" @click="previous">
          <i class="pi pi-step-backward"></i>
        </button>
        <button class="p-button p-button-outlined" @click="playPause">
          <i :class="playing ? 'pi pi-pause' : 'pi pi-play'"></i>
        </button>
        <button class="p-button p-button-outlined" @click="next">
          <i class="pi pi-step-forward"></i>
        </button>
        <button class="p-button p-button-outlined" @click="toggleVolume">
          <i :class="muted ? 'pi pi-volume-off' : 'pi pi-volume-up'"></i>
        </button>
        <button class="p-button p-button-outlined" @click="toggleRandom">
          <i :class="random ? 'pi pi-random' : 'pi pi-sort-alt'"></i>
        </button>
        <button class="p-button p-button-outlined" @click="toggleRepeat">
          <i :class="repeat ? 'pi pi-repeat' : 'pi pi-refresh'"></i>
        </button>
        <button class="p-button p-button-outlined" @click="openAudioSettings">
          <i class="pi pi-cog"></i>
        </button>
        <div class="music-player-progress">
          <!-- Barra de progreso del reproductor -->
          <span class="music-player-current-time">{{ currentTime }}</span>
          <Slider
            class="mx-2"
            :value="progress"
            mode="horizontal"
            :max="100"
            @input="onSliderInput"
            :style="{ width: '50%' }"
          />
          <span class="music-player-duration">{{ duration }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

const playing = ref(false);
const currentTime = ref("0:00");
const duration = ref("3:30"); // Duración de la canción en formato "minutos:segundos"
const progress = ref(100); // Valor de la barra de progreso (0 a 100)
const muted = ref(false); // Estado del volumen (silenciado o no)
const random = ref(false); // Estado de reproducción aleatoria (activada o no)
const repeat = ref(false); // Estado de repetir canciones (activado o no)

const playPause = () => {
  playing.value = !playing.value;
  // Lógica para reproducir o pausar la canción
};

const previous = () => {
  // Lógica para reproducir la canción anterior
};

const next = () => {
  // Lógica para reproducir la siguiente canción
};

const toggleVolume = () => {
  muted.value = !muted.value;
  // Lógica para ajustar el volumen (silenciar o reanudar el audio)
};

const toggleRandom = () => {
  random.value = !random.value;
  // Lógica para activar o desactivar la reproducción aleatoria
};

const toggleRepeat = () => {
  repeat.value = !repeat.value;
  // Lógica para activar o desactivar la repetición de canciones
};

const openAudioSettings = () => {
  // Lógica para abrir la configuración de audio (por ejemplo, mostrar un menú emergente)
};

const onSliderInput = (event) => {
  // Lógica para actualizar el progreso de reproducción cuando el usuario ajusta el slider
  progress.value = event.value;
};
</script>
  
  <style scoped>
.music-player-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 7rem; /* Altura de 13 rem */
  padding: 15px;
  background-color: var(--surface-overlay);
  color: var(--surface-900);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Valor alto para que se superponga sobre el contenido */
}

.music-player-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.music-player-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.music-player-info {
  margin-left: 10px;
}

.music-player-controls {
  display: flex;
  align-items: center;
}

.music-player-progress {
  display: flex;
  align-items: center;
}

.music-player-album-art img {
  width: 60px;
  height: 60px;
}

.music-player-song-title {
  font-size: 1rem;
  font-weight: bold;
}

.music-player-artist {
  font-size: 0.9rem;
}

.p-button-outlined {
  background-color: transparent;
  color:  var(--surface-900);;
  border-color: #fff;
}

.p-progressbar-value {
  background-color: #ff4d4f;
}

/* Estilos responsivos */
@media screen and (max-width: 600px) {
  .music-player-container {
    flex-direction: column;
    align-items: center;
  }

  .music-player-info {
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
  