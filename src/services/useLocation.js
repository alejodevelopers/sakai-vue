import { useApi } from "@/api/useAPI";
import { useToast } from "primevue/usetoast";

const useLocation = () => {
  const api = useApi("api");
  const toast = useToast();

  const getLocation = async (country, state, city, address) => {
    try {
      if (city && address && country && state) {
        const { data } = await api.post("/location", {
          country: country,
          state: state,
          city: city,
          address: address
        });
        if (data) {
          return data;
        } else {
          toast.add({
            severity: "error",
            summary: "No se encontro Direccion",
            detail: "al parecer no encontramos una ubicacion",
            life: 3000
          });
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getLocation
  };
};

export default useLocation;
