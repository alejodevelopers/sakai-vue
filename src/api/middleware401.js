import { useAuthStore } from "@/stores/auth.js";

/**
 * Middleware - si el usuario pierde la autenticación (401), se le expulsa
 * DESDE https://youtu.be/BWNcuB3LQz8?t=1119
 */
const middleware401 = async error => {
  const { status } = error.request;

  if (status === 401 || status === 419) {
	console.log(error);
    const auth = useAuthStore();

    // Espera 3 segundos y luego cierra la sesión del usuario
    setTimeout(async () => await auth.logout(), 30000);

    return Promise.reject({
      name: "Permission denied",
      message:
        "You lost your credentials - will be redirected to the login page."
    });
  }
  return Promise.reject(error);
};

export { middleware401 as default };
