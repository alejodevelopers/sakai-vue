<template>
    <button class="music-player-button" @click="onClick">
      <i :class="icon"></i>
    </button>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  
  const { icon } = defineProps(["icon"]);
  const emits = defineEmits();
  
  const onClick = () => {
    emits("onClick");
  };
  </script>
  
  <style scoped>
  .music-player-button {
    background-color: transparent;
    color: var(--surface-900); /* Color del ícono del botón */
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1.5rem;
    margin: 0 5px; /* Espaciado entre los botones del reproductor */
  }
  
  /* Agrega estilos adicionales para los botones si lo necesitas */
  </style>
  