<script setup lang="ts">
import { useMediaControls } from '@vueuse/core';
import { ref } from 'vue';
const Audio = ref();
const { tracks, enableTrack, playing, selectedTrack } = useMediaControls(Audio, {
    src: '/video/mentepositiva.mp3',
    tracks: [
        {
            src: '/video/poposote.mp3',
            kind: 'subtitles',
            label: 'English',
            srcLang: 'en'
        },
        {
            src: '/video/mentepositiva.mp3',
            kind: 'subtitles',
            label: 'Español',
            srcLang: 'en'
        }
    ]
});
</script>

<template>
    <audio controls ref="Audio" />
    <Button v-for="track in tracks" :key="track.id" @click="enableTrack(track)">
        <br />
    </Button>
</template>