<template>
    <div>
      <div v-for="(color, index) in colors" :key="index" class="floating-circle" :style="{ 'background-color': color }"></div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const colors = ref(['red', 'blue', 'green', 'yellow']);
  
      return {
        colors,
      };
    },
  };
  </script>
  
  <style>
  @keyframes float {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0, -20px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  
  .floating-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: float 2s ease-in-out infinite;
  }
  </style>