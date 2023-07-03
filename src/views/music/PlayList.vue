<!-- <template>
  <div class="wrapper">
    <div class="img-area">
      <img :src="currentMusic.image" alt="Music Image" />
    </div>
    <div class="song-details">
      <h2 class="name">{{ currentMusic.name }}</h2>
      <p class="artist">{{ currentMusic.artist }}</p>
    </div>
    <div class="controls">
      <button @click="prevMusic">Prev</button>
      <button @click="togglePlay">
        {{ isMusicPaused ? "Play" : "Pause" }}
      </button>
      <button @click="nextMusic">Next</button>
    </div>
    <audio
      ref="audioPlayer"
      :src="currentMusic.source"
      @timeupdate="updateProgress"
    ></audio>
    <div class="progress-area">
      <div class="progress-bar" :style="{ width: progressPercentage }"></div>
    </div>
  </div>
</template>
  
  <script>
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const allMusic = [
      // Aquí debes proporcionar tus propias canciones en el formato deseado
      // {
      //   name: 'Nombre de la canción',
      //   artist: 'Artista',
      //   image: 'Ruta de la imagen',
      //   source: 'Ruta del archivo de audio'
      // }
      {
        name: "Harley Bird - Home",
        artist: "Jordan Schor",
        image: "music-1",
        source: "https://www.last.fm/music/Rihanna/_/We+Found+Love+(feat.+Calvin+Harris)",
      },
      {
        name: "Ikson Anywhere – Ikson",
        artist: "Audio Library",
        image: "music-2",
        source: "music-2",
      },
      {
        name: "Beauz & Jvna - Crazy",
        artist: "Beauz & Jvna",
        image: "music-3",
        source: "music-3",
      },
      {
        name: "Hardwind - Want Me",
        artist: "Mike Archangelo",
        image: "music-4",
        source: "music-4",
      },
      {
        name: "Jim - Sun Goes Down",
        artist: "Jim Yosef x Roy",
        image: "music-5",
        source: "music-5",
      },
      {
        name: "Lost Sky - Vision NCS",
        artist: "NCS Release",
        image: "music-6",
        source: "music-6",
      },
    ];

    const musicIndex = ref(Math.floor(Math.random() * allMusic.length + 1));
    const isMusicPaused = ref(true);
    const progressPercentage = ref("0%");
    const audioPlayer = ref(null);

    const currentMusic = computed(() => {
      return allMusic[musicIndex.value - 1];
    });

    const togglePlay = () => {
      if (isMusicPaused.value) {
        audioPlayer.value.play();
      } else {
        audioPlayer.value.pause();
      }
      isMusicPaused.value = !isMusicPaused.value;
    };

    const prevMusic = () => {
      musicIndex.value--;
      if (musicIndex.value < 1) {
        musicIndex.value = allMusic.length;
      }
      loadMusic();
      playMusic();
    };

    const nextMusic = () => {
      musicIndex.value++;
      if (musicIndex.value > allMusic.length) {
        musicIndex.value = 1;
      }
      loadMusic();
      playMusic();
    };

    const loadMusic = () => {
      const music = allMusic[musicIndex.value - 1];
      audioPlayer.value.src = music.source;
    };

    const playMusic = () => {
      audioPlayer.value.play();
      isMusicPaused.value = false;
    };

    const updateProgress = () => {
      const currentTime = audioPlayer.value.currentTime;
      const duration = audioPlayer.value.duration;
      progressPercentage.value = `${(currentTime / duration) * 100}%`;
    };

    onMounted(() => {
      audioPlayer.value.addEventListener("ended", nextMusic);
    });

    return {
      allMusic,
      currentMusic,
      isMusicPaused,
      progressPercentage,
      audioPlayer,
      togglePlay,
      prevMusic,
      nextMusic,
      loadMusic,
      playMusic,
      updateProgress,
    };
  },
};
</script> -->


<template>
  <div class="p-d-flex p-ai-center p-flex-column" style="height: 300px;">
    <div class="p-mb-2">
      <button class="p-button p-button-text" @click="play">Play</button>
      <button class="p-button p-button-text" @click="pause">Pause</button>
      <button class="p-button p-button-text" @click="stop">Stop</button>
    </div>
    <div class="p-d-flex p-ai-center p-flex-column">
      <div class="p-text-bold">{{ currentSong.title }}</div>
      <div class="p-text-secondary">{{ currentSong.artist }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentSong = ref({
  title: '',
  artist: '',
});

const play = () => {
  // Lógica para reproducir la música
};

const pause = () => {
  // Lógica para pausar la música
};

const stop = () => {
  // Lógica para detener la música
};
</script>

<style scoped>
.p-d-flex {
  display: flex;
}
.p-ai-center {
  align-items: center;
}
.p-flex-column {
  flex-direction: column;
}
.p-mb-2 {
  margin-bottom: 2rem;
}
.p-text-bold {
  font-weight: bold;
}
.p-text-secondary {
  color: #999999;
}
</style>
