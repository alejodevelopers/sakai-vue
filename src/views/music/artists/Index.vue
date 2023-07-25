
<template>
  <DataTable
    responsiveLayout="stack"
    breakpoint="960px"
    showGridlines
    columnResizeMode="fit | expand"
    :value="artists"
  >
    <Column field="" header="">
      <template #body="slotProps">
        <img :src="slotProps.data.image_md"  width="100" alt="" />
      </template>
    </Column>
    <Column field="name" header="Name">
      <template #body="slotProps">
        {{ slotProps.data.name }}
      </template>
    </Column>
    <Column field="genres" header="Genres">
      <template #body="slotProps">
        <p>
          {{ slotProps.data.genres[0] ?? "Desconocido" }}
          {{ slotProps.data.genres[1] ?? "" }}
          {{ slotProps.data.genres[2] ?? "" }}
        </p>
      </template>
    </Column>
    <Column field="popularity" header="Popularity">
      <template #body="slotProps">
        <p>{{ slotProps.data.popularity }}</p>
      </template>
    </Column>
    <Column field="duration" header="">
      <template #body="slotProps">
        <router-link :to="`/artist/${slotProps.data.id}/albums`"
          >Albums</router-link
        >
      </template>
    </Column>
  </DataTable>
</template>
  
  <script setup>
import useArtists from "@/services/useArtists";
import { onMounted, watchEffect } from "vue";
const { artists, getArtists, getAlbumsArtist } = useArtists();
onMounted(() => {
  getArtists();
});
watchEffect(() => {
  artists.value;
});
</script>