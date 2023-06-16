import { computed, ref } from "vue";

const useCountries = () => {
  const countries = ref([]);
  const states = ref([]);
  const cities = ref([]);

  const getCountries = async () => {
    return await fetch("demo/data/countries.json")
      .then(res => res.json())
      .then(d => {
        countries.value = d;
      });
  };

  const getStates = country => {
    if (country) {
      countries.value.map(x => {
        if (x.name === country) {
          states.value = x.states;
        }
      });
    }
  };
  const getCities = state => {
    if (state) {
      states.value.map(x => {
        if (x.name === state) {
          cities.value = x.cities;
        }
      });
    }
  };

  getCountries();

  return {
    countries,
    states,
    cities,
    getCountries,
    getStates,
    getCities
  };
};
export default useCountries;
