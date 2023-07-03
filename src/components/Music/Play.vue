<script setup >
import { computed, onMounted, onUpdated, ref, watch, watchEffect } from 'vue';
import { useMediaControls } from '@vueuse/core';

const Audio = ref();
const cues = ref([
    {
        id: 1,
        src: '/video/poposote.mp3'
    },
    {
        id: 2,
        src: '/video/mentepositiva.mp3'
    }
]);
const count = ref(1);
const url = ref();
const play = ref(true);
const icon = ref('pi pi-play');
const prevBtn = ref(0);
const nextBtn = ref(0);
const backwardBtn = ref(1);
const forwardBtn = ref(1);
const ramdonBtn = ref(false);
const timeTrack = ref(0);
const showPlay = ref(true);

const images = ref([{ url: 'https://cdn.pixabay.com/photo/2015/07/10/13/18/guitar-839168_1280.jpg' }, { url: 'https://cdn.pixabay.com/photo/2020/11/02/05/56/music-5705801_1280.jpg' }]);
const responsiveOptions = ref([
    {
        breakpoint: '991px',
        numVisible: 4
    },
    {
        breakpoint: '767px',
        numVisible: 3
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);

const forward = () => {
    forwardBtn.value = forwardBtn.value++;
    cues.value.map((x) => {
        if (x.id === forwardBtn.value) {
            return (url.value = x.src);
        }
    });
};
const { playing, currentTime, duration, volume, tracks, enableTrack } = useMediaControls(Audio, { src: '/video/mentepositiva.mp3' });
const backward = () => {
    forwardBtn.value--;
    console.log(forwardBtn.value);
};

const visible = (event) => {
    console.log(event);
    showPlay.value = !showPlay;
};
watchEffect(() => {
    if (playing.value === false) {
        icon.value = 'pi pi-play';
    } else {
        icon.value = 'pi pi-pause';
    }

    console.log(url.value);
});

const ramdonPlay = () => {
    ramdonBtn.value = !ramdonBtn.value;
};
// Change initial media properties
onMounted(() => {
    volume.value = 0.5;
    currentTime.value = 0;
});

const timeEnd = computed(() => {
    /*     return parseInt(duration.value); */
    let segundos = Math.floor(duration.value / 1.0);
    let minutos = Math.floor(segundos / 60);
    segundos = segundos % 60;

    return minutos + ':' + segundos;
});
const timeStart = computed(() => {
    /*     return parseInt(duration.value); */
    let seg = 0;
    let segundos = Math.floor(currentTime.value / 1.0);
    let minutos = Math.floor(segundos / 60);
    segundos = segundos % 60;
    if (segundos <= 9) {
        seg = '0' + segundos;
    } else {
        seg = segundos;
    }
    return minutos + ':' + seg;
});
</script>

<template>
    <audio ref="Audio" />
    <!-- <button @click="playing = !playing">Play / Pause</button>
    <button @click="volume = !volume">volume</button> -->

    <Card style="width: 25em" class="">
        <template #header>
            <!--    <div class="cover-container">
                <Img alt="user header" src="https://cdn.pixabay.com/photo/2015/07/10/13/18/guitar-839168_1280.jpg" class="cover text-center p-2" />
            </div> -->
            <div class=" ">
                <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px" :showItemNavigators="true" :showThumbnails="false">
                    <template #item="slotProps">
                        <img :src="slotProps.item.url" :alt="slotProps" style="width: 100%; display: block" />
                    </template>
                    <template #thumbnail="slotProps">
                        <img :src="slotProps.item.url" :alt="slotProps.item.alt" style="display: block" />
                    </template>
                </Galleria>
            </div>
        </template>
        <template #title>
            <h3 class="m-0 text-center text-teal-800">We Found Love - Rihana</h3>
            <h5 class="m-0 text-center text-pink-900">NSC Acustic</h5>
            <Slider v-model="currentTime" p-slider orientation="horizontal" class="my-4" />
            <div class="text-center">
                <span>{{ timeStart }} / {{ timeEnd }}</span>
            </div>
        </template>
        <!--  <template #subtitle> Card subtitle </template> -->
        <template #content>
            <div class="text-center">
                <Button :class="ramdonBtn === false ? 'styPlay' : 'active'" icon="pi pi-sync" @click="ramdonPlay" severity="secondary" style="margin-left: 0.5em" />
                <Button class="styPlay" icon="pi pi-step-backward-alt" @click="backward" severity="secondary" style="margin-left: 0.5em" />
                <Button :class="playing === false ? 'styPlay' : 'active'" :icon="icon" @click="playing = !playing" severity="secondary" style="margin-left: 0.5em" />
                <Button class="styPlay" icon="pi pi-step-forward-alt" @click="forward" severity="secondary" style="margin-left: 0.5em" />
                <Button class="styPlay" icon="pi pi-stop" @click="forward" severity="secondary" style="margin-left: 0.5em" />
            </div>
        </template>
        <template #footer> </template>
    </Card>
</template>



<style lang="css" scoped>
.styPlay {
    height: 50px;
    width: 50px;
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