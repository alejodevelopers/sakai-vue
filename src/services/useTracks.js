import { ref } from "vue";

const useTracks = () => {
  const tracks = ref([]);

  const getTracks = () => {
    const { data } = api.get("/api/tracks");
    console.log(data.data);
    tracks.value = data.data;
  };

  return {
    getTracks,
    tracks
  };
};
export default useTracks;
