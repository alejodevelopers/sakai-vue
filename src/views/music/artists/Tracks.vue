
<template>
  <div class="text-center mb-4">
    <img :src="album.image_md" class="avatar_album" :alt="album.name" />
    <Divider />
    <div class="p-badge">Album</div>
    <div class="text-2xl font-bold mb-1 text-center">
      {{ album.name }}
    </div>
    <div class="text-xl font-normal text-center">
      Total Tracks: {{ tracksAlbum.length }}
    </div>
    <div class="text-lg text-center">
      Release date: {{ album.release_date }}
    </div>
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
        <audio ref="audioElement"></audio>
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
  {{ albumId }}
</template>
    
    <script setup>
import useArtists from "@/services/useArtists";
import { useRoute } from "vue-router";
import { onMounted, watchEffect, ref } from "vue";
const { getAlbumTracks, tracksAlbum, album } = useArtists();
const route = useRoute();
const albumId = ref(route.params.id);
const icon = ref("pi pi-play");
import { useMediaControls } from "@vueuse/core";
const visibleBottom =ref(false);
onMounted(() => {
  getAlbumTracks(albumId.value);
});
const convertToMinutesAndSeconds = (durationInMs) => {
  const minutes = Math.floor(durationInMs / 60000);
  const seconds = Math.floor((durationInMs % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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