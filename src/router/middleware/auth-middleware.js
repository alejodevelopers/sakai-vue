import { useAuthStore } from "@/stores/auth.js";

export default (to, from, next) => {
  const auth = useAuthStore();

  // Rutas excepcionales que no requieren autenticación
  let exceptionalRoutes = ["login", "register", "forgot-password"];
  let isGoingExceptionalRoutes = exceptionalRoutes.includes(to.name);

  /**
   * SI EL USUARIO NO HA INICIADO SESIÓN
   */
  if (!auth.isLoggedIn) {
    if (isGoingExceptionalRoutes) {
      // El usuario no ha iniciado sesión pero va a rutas excepcionales, está bien
      next();
      return;
    } else {
      // Otras rutas que no sean excepcionales, redirige a la página de inicio de sesión
      next({ name: "login" });
      return;
    }
  }

  /**
   * SI EL USUARIO HA INICIADO SESIÓN
   */
  if (auth.isLoggedIn && isGoingExceptionalRoutes) {
    // El usuario ha iniciado sesión pero está yendo a una ruta excepcional,
    // redirige a la página de inicio con la razón de redirección
    next({ name: "home", query: { "redirect-reason": "already logged" } });
  } else {
    next();
  }
};
