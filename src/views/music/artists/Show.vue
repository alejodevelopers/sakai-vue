<template>
  <div class="text-center mb-4">
    <img :src="artist.image_md" class="avatar_artist" :alt="artist.name" />
    <Divider />
    <div class="p-badge">Artist</div>
    <div class="text-2xl font-bold mb-1 text-center">
      {{ artist.name }}
    </div>
    <div class="text-xl font-normal text-center">
      Total Albums: {{ albums.length }}
    </div>
    <div class="text-lg text-center">Popularity: {{ artist.popularity }}%</div>
  </div>
  <Divider />
  <div class="grid-container">
    <div
      class="col-span-1 rounded-lg shadow-sm overflow-hidden card"
      v-for="album in albums"
      :key="album.id"
    >
      <img
        alt="album cover"
        :src="album.image_md"
        class="w-full h-48 object-cover mb-1"
      />
      <div class="p-4 text-center">
        <div class="p-badge">Album</div>
        <div class="text-xl font-bold mb-2">{{ album.name }}</div>
        <div class="text-md font-medium">Tracks: {{ album.total_tracks }}</div>
        <div class="text-gray-500 text-sm">
          release date: {{ album.release_date }}
        </div>
        <router-link :to="`/album/${album.id}/tracks`">show Tracks</router-link>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import useArtists from "@/services/useArtists";
const { getAlbumsArtist, albums, artist } = useArtists();

const route = useRoute();
const artistId = ref(route.params.id);

onMounted(() => {
  getAlbumsArtist(artistId.value);
});
</script>
  
  <style>
.avatar_artist {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 5px solid var(--surface-overlay);
}
/* Estilos personalizados para que las cards sean responsivas */

/* Estilos para el margen del contenedor */
.grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin: 5px; /* Margen de 5px en cada extremo del contenedor */
}
.card {
  background-color: var(--surface-overlay);
  color: var(--surface-900);
}

@media (min-width: 640px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1280px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Estilos para el espaciado entre las cards */
.grid-container > div {
  padding: 0rem 0rem 2rem 0rem;
}

/* Estilos para la imagen */
.img-container img {
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 1rem;
}
</style>
  