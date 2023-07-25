import { ref } from "vue";
import { useApi } from "@/api/useAPI.js";
const api = useApi();
const useArtists = () => {
  const artists = ref([]);
  const artist = ref({});
  const albums = ref([]);
  const album = ref({});
  const tracksAlbum = ref([]);
  const getArtists = async () => {
    try {
      const { data } = await api.get("/artists");
      artists.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const getAlbumsArtist = async id => {
    try {
      const { data } = await api.get(`/artists/${id}`);
      albums.value = data.albums;
      artist.value = data.artist;
    } catch (error) {}
  };
  const getAlbumTracks = async id => {
    try {
      const { data } = await api.get(`/albums/${id}`);
      tracksAlbum.value = data.tracks;
      album.value = data.album;
    } catch (error) {}
  };

  return {
    getArtists,
    artists,
    artist,
    album,
    getAlbumsArtist,
    getAlbumTracks,
    tracksAlbum,
    albums
  };
};
export default useArtists;
