<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import MusicService from '../../services/MusicService';
const toast = useToast();
const { search, s } = MusicService();
const buscar = ref();
</script>

<template>
    <div class="py-2">
        <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="s" @change="search" placeholder="Search" />
        </span>
      
    </div>
    <Card style="width: 25em">
        <template #header>
            <img alt="user header" src="/images/usercard.png" />
        </template>
        <template #title> Advanced Card </template>
        <template #subtitle> Card subtitle </template>
        <template #content>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
            </p>
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" />
        </template>
    </Card>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
