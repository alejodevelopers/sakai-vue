<template>
  <div>
    <!-- Reproductor de audio -->

    <!-- Botones para cambiar de canción -->
    <!--  <div>
      <button
        v-for="(song, index) in songs"
        :key="index"
        @click="changeSong(index)"
      >
        {{ song.title }}
      </button>
    </div> -->
  </div>
  <div class="card">
    <div
      class="card-container blue-container flex align-items-center justify-content-start"
    >
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="search" @change="getData" placeholder="Search" />
      </span>
    </div>
  </div>
  <TabView class="tabview-custom">
    <TabPanel>
      <template #header>
        <i class="pi pi-calendar mr-2"></i>
        <span>All</span>
      </template>
      <h3 class="my-4 title-music">All</h3>
      <DataTable :value="songs" tableStyle="min-width: 50rem">
        <Column field="url" header="">
          <template #body="slotProps">
            <img :src="slotProps.data.album.images[2].url" alt="" />
          </template>
        </Column>
        <Column field="name" header="Song">
          <template #body="slotProps">
            {{ slotProps.data.name }}
          </template>
        </Column>
        <Column field="artist" header="Artist">
          <template #body="slotProps">
            <div class="row">
              <p>{{ slotProps.data.artists[0].name }}</p>
            </div>
          </template>
        </Column>
        <Column field="album" header="Album">
          <template #body="slotProps">
            <p>{{ slotProps.data.album.name }}</p>
          </template>
        </Column>
        <Column field="duration" header="Time">
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
            <Button
              :class="play === true ? 'styPlay' : 'active'"
              icon="pi pi-download"
              @click="getTrack(slotProps.data.id)"
              severity="secondary"
              style="margin-left: 0.5em"
            />
          </template>
        </Column>
        <!--   <Column field="duration" header="Time">
          <template #body="slotProps">
            <p>{{ slotProps.data.duration }}</p>
            <iframe
              scrolling="no"
              frameborder="0"
              allowTransparency="true"
              :src="`https://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=true&width=300&height=300&color=007FEB&layout=dark&size=medium&type=tracks&id=${slotProps.data.id}&app_id=1`"
            ></iframe>
          </template>
        </Column> -->
      </DataTable>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-calendar mr-2"></i>
        <span>Songs</span>
      </template>
      <h3 class="my-4 title-music">Songs</h3>
      <DataTable :value="cues" tableStyle="min-width: 50rem">
        <Column field="title" header="">
          <template #body="slotProps">
            <img :src="slotProps.data.cover_sm" width="80" alt="" />
          </template>
        </Column>
        <Column field="title" header="Title">
          <template #body="slotProps">
            {{ slotProps.data.title }}
          </template>
        </Column>
        <Column field="artist" header="Artist">
          <template #body="slotProps">
            <div class="row">
              <p>{{ slotProps.data.artist }}</p>
            </div>
          </template>
        </Column>
        <Column field="album" header="Album">
          <template #body="slotProps">
            <p>{{ slotProps.data.album }}</p>
          </template>
        </Column>
        <Column field="duration" header="Time">
          <template #body="slotProps">
            <audio ref="audioElement"></audio>
            <Button
              :class="play === true ? 'styPlay' : 'active'"
              :icon="icon"
              @click="playSong(slotProps.data)"
              severity="secondary"
              style="margin-left: 0.5em"
            />
          </template>
        </Column>
        <Column field="duration" header="Time">
          <template #body="slotProps">
            <p>{{ slotProps.data.durationText }}</p>
            <!-- <iframe
              scrolling="no"
              frameborder="0"
              allowTransparency="true"
              :src="`https://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=true&width=300&height=300&color=007FEB&layout=dark&size=medium&type=tracks&id=${slotProps.data.id}&app_id=1`"
            ></iframe> -->
          </template>
        </Column>
      </DataTable>
    </TabPanel>

    <TabPanel>
      <template #header>
        <i class="pi pi-search mr-2"></i>
        <span>Albums</span>
        <i class="pi pi-cog ml-2"></i>
      </template>
      <div
        class="flex flex-wrap card-container blue-container column-gap-5 row-gap-5"
      >
        <div
          v-for="song in songs"
          :key="song.id"
          class="flex align-items-center justify-content-center"
        >
          <Card style="width: 18em" class="">
            <template #header>
              <img
                alt="user header"
                :src="song.album.images[0].url"
                style="width: 100%"
              />
            </template>
            <template #subtitle>
              {{ song.album.name }}
            </template>

            <template #footer>
              <Button
                :class="play === true ? 'styPlay' : 'active'"
                :icon="icon"
                @click="touch"
                severity="secondary"
                style="margin-left: 0.5em"
              />

              <Button
                class="styPlay"
                icon="pi pi-stop"
                @click="forward"
                severity="secondary"
                style="margin-left: 0.5em"
              />
            </template>
          </Card>
        </div>
      </div>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-search mr-2"></i>
        <span>Artists</span>
        <i class="pi pi-cog ml-2"></i>
      </template>
      <p></p>
    </TabPanel>
  </TabView>

  <Sidebar
    v-model:visible="visibleBottom"
    position="bottom"
    class="w-full"
    style="height: 15em"
  >
    <div class="flex overflow-hidden">
      <play></play>
    </div>
  </Sidebar>
</template>
<script setup>
import useDeezer from "@/services/useDeezer";
import { onMounted, ref } from "vue";
import { useMediaControls } from "@vueuse/core";
import Play from "@/components/Music/Play.vue";

const { search, getData, songs, getTrack, getTracks, cues } = useDeezer();
const audioElement = ref(null);
const play = ref(true);
const icon = ref("pi pi-play");
const prevBtn = ref(0);
const nextBtn = ref(0);
const backwardBtn = ref(1);
const forwardBtn = ref(1);
const ramdonBtn = ref(false);
const timeTrack = ref(0);
const showPlay = ref(true);
const visibleBottom = ref(false);

const touch = () => {};

const responsiveOptions = ref([
  {
    breakpoint: "991px",
    numVisible: 4,
  },
  {
    breakpoint: "767px",
    numVisible: 3,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
  },
]);

const forward = () => {
  forwardBtn.value++;
  console.log(forwardBtn.value);
};
const backward = () => {
  forwardBtn.value--;
  console.log(forwardBtn.value);
};

const visible = (event) => {
  console.log(event);
  showPlay.value = !showPlay;
};

const ramdonPlay = () => {
  ramdonBtn.value = !ramdonBtn.value;
};

// Obtener las referencias a las propiedades del reproductor de medios
const { playing, currentTime, duration, volume, tracks, enableTrack } =
  useMediaControls(audioElement);

// Función para cambiar de canción
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
  getTracks();

  // Habilitar la pista de texto correspondiente si es necesario
  //enableTrack(selectedSong.preview_url);
};

const playSong = (e) => {
  const selectedSong = e;
  visibleBottom.value = true;
  const audio = audioElement.value;

  // Cambiar el src de la etiqueta de audio y reproducir la nueva canción
  if (audio) {
    audio.src = selectedSong.url;
    audio.load(); // Cargar la nueva canción
    audio.play(); // Reproducir la nueva canción
  }

  // Habilitar la pista de texto correspondiente si es necesario
  //enableTrack(selectedSong.preview);
};

// Ejecutar acciones adicionales después de cargar el componente
</script>
<style scoped>
.title-music:hover {
  color: purple;
}
.styPlay {
  height: 25px;
  width: 25px;
  border-radius: 100%;
  background-color: #0b8a8a;
  border: 0 #0b8a6e;
}

.active {
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background-color: #243d3d;
  border: 0 #0b8a6e;
}

.text-title {
  color: #30b98c;
}
.cover {
  border-radius: 5px;
}
.cover-card {
  width: 100%;
  background: #fffefe;
}
:deep(.p-slider .p-slider-range) {
  background: #653096;
}
</style>