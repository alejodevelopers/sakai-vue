import { ref } from "vue";
import axios from "axios";
const MusicService = () => {
  const search = async () => {
    const options = {
      method: "POST",
      url: "https://musicapi13.p.rapidapi.com/public/search",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "ce4a132dfemshdcecd27d4e2100fp19836fjsn95dd7449d2ea",
        "X-RapidAPI-Host": "musicapi13.p.rapidapi.com"
      },
      data: {
        track: "Bezos I",
        artist: "Bo Burnham",
        type: "track",
        sources: ["spotify"]
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    search
  };
};

export default MusicService;
