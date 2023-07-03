import { ref } from "vue";
import { useApi } from "@/api/useAPI.js";
const useSpotify = () => {
  const search = ref();
  const api = useApi();
  const songs = ref([]);
  const getData = async () => {
    try {
      const res = await api.get("spotify/search", {
        params: {
          query: search.value
        }
      });
      if (res) {
        songs.value = res.data.tracks.items;
        console.log(songs.value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    search,
    getData,
    songs
  };
};
export default useSpotify;
