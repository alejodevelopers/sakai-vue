<template>
  <div>
    <h1>Detalle del Producto {{ artistId }}</h1>
    <!-- Contenido del detalle del producto -->
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const artistId = ref(route.params.id); // Accedemos al valor del parámetro "id"
</script>
  