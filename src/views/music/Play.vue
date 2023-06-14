<script setup>
import { ref } from 'vue';
name: 'play';
const play = ref(true);
const icon = ref('pi pi-play');
const prevBtn = ref(0);
const nextBtn = ref(0);
const backwardBtn = ref(1);
const forwardBtn = ref(1);
const ramdonBtn = ref(false);
const timeTrack = ref(0);
const showPlay = ref(true);
const touch = () => {
    play.value = !play.value;
    if (play.value === true) {
        icon.value = 'pi pi-play';
    } else {
        icon.value = 'pi pi-pause';
    }
};

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
</script>


<template>
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
            <Slider v-model="timeTrack" p-slider orientation="horizontal" class="my-4" />
        </template>
        <!--  <template #subtitle> Card subtitle </template> -->
        <template #content>
            <div class="text-center">
                <Button :class="ramdonBtn === false ? 'styPlay' : 'active'" icon="pi pi-sync" @click="ramdonPlay" severity="secondary" style="margin-left: 0.5em" />
                <Button class="styPlay" icon="pi pi-step-backward-alt" @click="backward" severity="secondary" style="margin-left: 0.5em" />
                <Button :class="play === true ? 'styPlay' : 'active'" :icon="icon" @click="touch" severity="secondary" style="margin-left: 0.5em" />
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