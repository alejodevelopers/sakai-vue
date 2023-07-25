import { defineStore } from 'pinia'
import { useApi } from '@/api/useAPI.js'

const api = useApi()


// Define tu store con Pinia
export const useMusicStore = defineStore({
  // Asigna un identificador único para el store
  id: 'music',

  // Define el estado inicial del store
  state: () => ({
    songURL: '',
    musicCollection: [],
  }),

  // Define las acciones (métodos) para modificar el estado
  actions: {
    // Acción para actualizar la URL de la canción
    updateSongURL(newURL) {
      this.songURL = newURL;
    },
    
    // Acción para actualizar la colección de datos de música
    updateMusicCollection(newCollection) {
      this.musicCollection = newCollection;
    },
  },
});
