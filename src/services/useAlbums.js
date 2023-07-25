import { ref } from "vue";

const useAlbums = () => {
  const albums = ref([]);

  const getArtists = () => {
    const { data } = api.get("/api/albums");
    console.log(data.data);
    albums.value = data.data;
  };

  getArtists();

  return {
    getArtists,
    albums
  };
};
export default useAlbums;
