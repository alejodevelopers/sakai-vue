<template>
  <div class="text-center mb-4">
    <img :src="album.image_md" class="avatar_album" :alt="album.name" />
    <Divider />
    <div class="p-badge">Album</div>
    <div class="text-2xl font-bold mb-1">
      {{ album.name }}
    </div>
    <div class="text-xl font-normal">
      {{ tracksAlbum.length }} songs - {{ getFormattedTotalDuration() }}
    </div>
    <div class="text-lg mb-3">Release date: {{ album.release_date }}</div>
    <Button
      icon="pi pi-play"
      size="large"
      rounded
      label="LISTEN"
      @click="playPlaylist(tracksAlbum)"
    />
  </div>
  <DataTable
    responsiveLayout="stack"
    breakpoint="960px"
    showGridlines
    columnResizeMode="fit | expand"
    :value="tracksAlbum"
  >
    <Column field="" header="">
      <template #body="slotProps">
        <img :src="slotProps.data.image_md" width="100" alt="" />
      </template>
    </Column>
    <Column field="name" header="Name">
      <template #body="slotProps">
        {{ slotProps.data.name }}
      </template>
    </Column>
    <Column field="track_number" header="Track Number">
      <template #body="slotProps">
        <p>
          {{ slotProps.data.track_number }}
        </p>
      </template>
    </Column>
    <Column field="duration_ms" header="Duration">
      <template #body="slotProps">
        <p>{{ convertToMinutesAndSeconds(slotProps.data.duration_ms) }}</p>
      </template>
    </Column>
    <Column field="duration_ms" header="Time">
      <template #body="slotProps">
        <Button
          v-if="slotProps.data.preview_url"
          :class="play === true ? 'styPlay' : 'active'"
          :icon="icon"
          @click="changeSong(slotProps.data)"
          severity="secondary"
          style="margin-left: 0.5em"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import useArtists from "@/services/useArtists";
import { useRoute } from "vue-router";
import { useMusicStore } from "../../../stores/music";
const { playPlaylist } = useMusicStore();
import MusicPlayerButton from "@/components/Music/MusicPlayerButton.vue";
import { onMounted, watchEffect, ref } from "vue";
const { getAlbumTracks, tracksAlbum, album } = useArtists();
const route = useRoute();
const albumId = ref(route.params.id);
const icon = ref("pi pi-play");
import { useMediaControls } from "@vueuse/core";
const visibleBottom = ref(false);
onMounted(() => {
  getAlbumTracks(albumId.value);
});
const convertToMinutesAndSeconds = (durationInMs) => {
  const minutes = Math.floor(durationInMs / 60000);
  const seconds = Math.floor((durationInMs % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
const getTotalDuration = () => {
  return tracksAlbum.value.reduce(
    (total, track) => total + track.duration_ms,
    0
  );
};

// Acción para obtener el tiempo total en un formato más legible (minutos y segundos)
const getFormattedTotalDuration = () => {
  const totalDurationInMs = getTotalDuration();
  const totalSeconds = Math.floor(totalDurationInMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Agregar ceros iniciales si es necesario
  const formattedHours = String(hours).padStart(2);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours} h. ${formattedMinutes} minutes`;
};
const audioElement = ref(null);
const play = ref(true);

const { playing, currentTime, duration, volume, tracks, enableTrack } =
  useMediaControls(audioElement);

const changeSong = (e) => {
  const selectedSong = e;
  visibleBottom.value = true;
  const audio = audioElement.value;

  // Cambiar el src de la etiqueta de audio y reproducir la nueva canción
  if (audio) {
    audio.src = selectedSong.preview_url;
    audio.load(); // Cargar la nueva canción
    audio.play(); // Reproducir la nueva canción
  }

  // Habilitar la pista de texto correspondiente si es necesario
  //enableTrack(selectedSong.preview_url);
};
/* watchEffect(() => {
  tracks.value;
}); */
</script>
<style scope>
.avatar_album {
  width: 300px;
  height: 300px;

  border: 5px solid var(--surface-overlay);
}
.styPlay {
  height: 25px;
  width: 25px;
  background-color: #0b8a8a;
  border: 0 #0b8a6e;
}

.active {
  height: 50px;
  width: 50px;
  background-color: #243d3d;
  border: 0 #0b8a6e;
}
</style>