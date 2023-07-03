import { ref } from "vue";
import { useApi } from "@/api/useAPI.js";
const useDeezer = () => {
  const search = ref();
  const api = useApi();
  const songs = ref([]);
  const cues = ref([]);
  const trackName = ref();
  const getData = async () => {
    try {
      const { data } = await api.get("spotify/search", {
        params: {
          query: search.value
        }
      });
      if (data) {
        console.log(data.tracks);
        songs.value = data.tracks.items;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTrack = async id => {
    trackName.value = id;
    try {
      const res = await api.post("track/search", {
        track: trackName.value
      });
      if (res) {
        getTracks();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTracks = async () => {
    try {
      const { data } = await api.get("tracks");
      if (data) {
        cues.value = data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  getTracks();
  return {
    search,
    getData,
    getTrack,
    getTracks,
    cues,
    songs
  };
};
export default useDeezer;
