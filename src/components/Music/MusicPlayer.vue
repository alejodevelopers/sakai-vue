<template>
  <div class="music-player">
    <div class="music-player-footer">
      <div class="music-player-container">
        <div class="music-player-content">
          <div class="music-player-album-art">
            <!-- Icono del álbum de la canción actual -->
            <img :src="currentTrack.image_sm" :alt="currentTrack.name" />
          </div>
          <div class="music-player-info">
            <!-- Información de la canción actual -->
            <span class="music-player-song-title">
              {{ currentTrack.name }} - {{ currentTrack.artist_name }}</span
            >
          </div>
        </div>
        <div class="music-player-controls">
          <!-- Controles del reproductor -->
          <MusicPlayerButton
            :icon="'pi pi-step-backward'"
            @onClick="playPrevious"
          />
          <MusicPlayerButton
            :icon="playing ? 'pi pi-pause' : 'pi pi-play'"
            @onClick="togglePlayPause"
          />
          <MusicPlayerButton :icon="'pi pi-step-forward'" @onClick="playNext" />
          <MusicPlayerButton
            :icon="mute ? 'pi pi-volume-off' : 'pi pi-volume-up'"
            @onClick="toggleMute"
          />
          <MusicPlayerButton
            :icon="random ? 'pi pi-random' : 'pi pi-sort-alt'"
            @onClick="toggleRandom"
          />
          <MusicPlayerButton
            :icon="repeat ? 'pi pi-repeat' : 'pi pi-refresh'"
            @onClick="toggleRepeat"
          />
          <MusicPlayerButton :icon="'pi pi-cog'" @onClick="openAudioSettings" />

          <div class="music-player-progress">
            <!-- Barra de progreso del reproductor -->
            <span
              class="music-player-current-time"
              @mouseenter="showTimeTooltip = true"
              @mouseleave="showTimeTooltip = false"
            >
              {{ currentTime }}
            </span>
            <Slider
              class="mx-2"
              :value="progress"
              mode="horizontal"
              :max="100"
              @input="onSliderInput"
              :style="{ width: '50%' }"
              @mouseenter="showTimeTooltip = true"
              @mouseleave="showTimeTooltip = false"
            />
            <span
              class="music-player-duration"
              @mouseenter="showTimeTooltip = true"
              @mouseleave="showTimeTooltip = false"
            >
              {{ duration }}
            </span>
            <div class="music-player-time-tooltip" v-if="showTimeTooltip">
              {{ formatTime((progress * totalDurationInMs) / 100) }} /
              {{ formatTime(totalDurationInMs) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <audio ref="audioElement" />
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { useMusicStore } from "@/stores/music";
import MusicPlayerButton from "@/components/music/MusicPlayerButton.vue";
import { useMediaControls } from "@vueuse/core";
import Slider from "primevue/slider";

const musicStore = useMusicStore();
const audioElement = ref(null);
const { muted } = useMediaControls(audioElement);

const playing = computed(() => musicStore.play);
const currentTrack = computed(() => musicStore.track);
const mute = computed(() => (muted.value = musicStore.muted));
const random = computed(() => musicStore.random);
const repeat = computed(() => musicStore.repeat);
/* const currentTime = ref("0:00");
const duration = ref("3:30");  */ // Duración de la canción en formato "minutos:segundos"
const progress = ref(100); // Valor de la barra de progreso (0 a 100)
const totalDurationInMs = 1000 * 3 * 60 + 1000 * 30; // Ejemplo de duración total en milisegundos
let showTimeTooltip = false;

const togglePlayPause = () => {
  musicStore.togglePlayPause();
};

const playPrevious = () => {
  musicStore.playPrevious();
};

const playNext = () => {
  musicStore.playNext();
};

const toggleMute = () => {
  musicStore.toggleMute();
};

const toggleRandom = () => {
  musicStore.toggleRandom();
};

const toggleRepeat = () => {
  musicStore.toggleRepeat();
};

const openAudioSettings = () => {
  // Lógica para abrir la configuración de audio (por ejemplo, mostrar un menú emergente)
};

const onSliderInput = (event) => {
  // Lógica para actualizar el progreso de reproducción cuando el usuario ajusta el slider
  progress.value = event.value;
};

const updateCurrentTime = () => {
  // Lógica para actualizar el tiempo actual de reproducción del audio
  const currentTimeInSeconds = audioElement.value.currentTime;
  currentTime.value = formatTime(currentTimeInSeconds * 1000);
};

const formatTime = (timeInMs) => {
  // Lógica para formatear el tiempo en milisegundos a "minutos:segundos"
  const minutes = Math.floor(timeInMs / 60000);
  const seconds = Math.floor((timeInMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
watchEffect(() => {
  if (audioElement.value) {
    const audio = audioElement.value;

    // Cuando cambie la pista actual, actualizamos la fuente del audio
    audio.src = musicStore.track.preview_url;
    audio.load();

    // Establecemos el evento 'ended' para avanzar a la siguiente pista cuando la actual haya terminado
    audio.addEventListener("ended", () => {
      musicStore.playNext(); // Utiliza la acción playNext() del store para avanzar a la siguiente pista
    });

    if (musicStore.play) {
      audio.play();
    } else {
      audio.pause();
    }
  }
});
</script>
<style scoped>
.music-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 7rem; /* Altura del reproductor */
  padding: 15px;
  background-color: var(--surface-overlay); /* Color de fondo del reproductor */
  color: var(--surface-900); /* Color de texto del reproductor */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Valor alto para que se superponga sobre el contenido */
}

.music-player-footer {
  width: 100%;
  max-width: 800px; /* Ancho máximo del reproductor */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.music-player-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.music-player-album-art {
  margin-right: 10px; /* Espaciado entre el área del álbum y la información de la canción */
}

.music-player-album-art img {
  width: 60px;
  height: 60px;
  border-radius: 50%; /* Para dar forma circular a la imagen del álbum */
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

.music-player-current-time,
.music-player-duration {
  margin: 0 5px; /* Espaciado entre el tiempo actual y la duración total de la canción */
}

.music-player-time-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.8rem;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.music-player-progress:hover .music-player-time-tooltip {
  opacity: 1;
  visibility: visible;
}

/* Estilos responsivos */
@media screen and (max-width: 600px) {
  .music-player-footer {
    flex-direction: column;
    align-items: center;
  }

  .music-player-info {
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
