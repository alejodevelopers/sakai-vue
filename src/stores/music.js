import { defineStore } from "pinia";
export const useMusicStore = defineStore({
  id: "music",
  state: () => ({
    play: false,
    track: {},
    album: {},
    tracks: [], // Array que contiene todas las pistas de música disponibles
    playlist: [], // Array que contiene las pistas en la lista de reproducción
    currentTrackIndex: -1, // Índice de la pista actual en reproducción en la lista de reproducción
    volume: 50, // Volumen de reproducción (0 a 100)
    repeatTrack: false, // Repetir la pista actual (activado o no)
    repeatPlaylist: false, // Repetir toda la lista de reproducción (activado o no)
    shuffle: false, // Reproducción aleatoria (activado o no)
    muted: false
  }),

  actions: {
    playPlaylist(playlist) {
      this.currentPlaylist = playlist;
      this.currentTrackIndex = 0;
      this.track = this.currentPlaylist[this.currentTrackIndex];
      this.play = true;
    },

    playAlbumlist(playlist) {
      this.currentPlaylist = playlist;
      this.currentTrackIndex = 0;
      this.track = this.currentPlaylist[this.currentTrackIndex];
      this.play = true;
    },

    addToPlaylist(track) {
      this.playlist.push(track);
    },

    removeFromPlaylist(index) {
      if (index >= 0 && index < this.playlist.length) {
        this.playlist.splice(index, 1);
      }
    },

    setCurrentTrackIndex(index) {
      if (index >= 0 && index < this.playlist.length) {
        this.currentTrackIndex = index;
        this.track = this.playlist[index];
        this.play = true;
      }
    },
    playNext() {
      if (this.repeatTrack) {
        this.playCurrentTrack();
      } else if (this.shuffle) {
        this.playRandomTrack();
      } else {
        const newIndex = this.currentTrackIndex + 1;
        if (newIndex < this.currentPlaylist.length) {
          this.currentTrackIndex = newIndex;
          this.track = this.currentPlaylist[this.currentTrackIndex];
        } else if (this.repeatPlaylist) {
          this.currentTrackIndex = 0;
          this.track = this.currentPlaylist[this.currentTrackIndex];
        } else {
          this.stopMusic();
        }
      }
      this.play = true;
    },

    playPrevious() {
      if (this.repeatTrack) {
        this.playCurrentTrack();
      } else if (this.shuffle) {
        this.playRandomTrack();
      } else {
        const newIndex = this.currentTrackIndex - 1;
        if (newIndex >= 0) {
          this.currentTrackIndex = newIndex;
          this.track = this.currentPlaylist[this.currentTrackIndex];
        } else if (this.repeatPlaylist) {
          this.currentTrackIndex = this.currentPlaylist.length - 1;
          this.track = this.currentPlaylist[this.currentTrackIndex];
        } else {
          this.stopMusic();
        }
      }
      this.play = true;
    },

    playRandomTrack() {
      const randomIndex = Math.floor(
        Math.random() * this.currentPlaylist.length
      );
      this.currentTrackIndex = randomIndex;
      this.track = this.currentPlaylist[this.currentTrackIndex];
    },

    playCurrentTrack() {
      this.track = this.playlist[this.currentTrackIndex];
      this.play = true;
    },

    togglePlayPause() {
      this.play = !this.play;
    },

    toggleMute() {
      this.muted = !this.muted;
    },

    toggleRandom() {
      this.random = !this.random;
    },

    toggleRepeat() {
      this.repeat = !this.repeat;
    },

    seekToTime(timeInMs) {
      // Lógica para saltar a un tiempo específico de reproducción
    },

    stopMusic() {
      this.play = false;
      this.track = {};
    },

    searchMusic(query) {
      // Lógica para buscar música en función de la consulta
    },

    getTotalDuration() {
      // Lógica para obtener la duración total de todas las pistas en la lista de reproducción
    }
  }
});
