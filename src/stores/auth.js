import { defineStore } from 'pinia'
import router from '@/router'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { useApi } from '@/api/useAPI'

const web = useApi('web')

export const useAuthStore = defineStore({
  id: 'auth',
  state: () =>
    // Estado inicial que se recupera del almacenamiento local o utiliza valores predeterminados
    JSON.parse(localStorage.getItem('AUTH_STATE')) ?? {
      email: null,
      username: null,
      isLoggedIn: false,
    },

  actions: {
    // Actualiza el estado y guarda en el almacenamiento local
    updateState(payload) {
      let newUserState = { ...this.$state, ...payload }
      localStorage.removeItem('AUTH_STATE')
      localStorage.setItem('AUTH_STATE', JSON.stringify(newUserState))
      this.$reset()
    },

    // Inicia sesión
    async login({ email, password }) {
      const user = useUserStore()
      try {
        await web.post('/login', { email, password })
        this.updateState({ email, isLoggedIn: true })
        await user.storeInfo()
      } catch (error) {
        console.log(error);
        console.log('Error at login: ', error.message)
        throw error
      }
    },

    // Registra un nuevo usuario
    async register(props) {
      const user = useUserStore()
      try {
        await web.post('/register', props)
        this.updateState({ email: props.email, isLoggedIn: true })
        await user.storeInfo()
      } catch (error) {
        console.log('Error at register: ', error.message)
        throw error
      }
    },

    // Envía una solicitud para restablecer la contraseña
    async forgotPassword({ email }) {
      try {
        await web.post('/forgot-password', { email })
      } catch (error) {
        console.log('ERROR WITH FORGOT-PASSWORD ENDPOINT: ', error.message)
        throw error
      }
    },

    // Cierra sesión
    async logout() {
      const user = useUserStore()
      const router = useRouter()
      localStorage.clear() // siempre limpiar localStorage antes de restablecer el estado
      this.$reset()
      user.$reset()

      try {
        await web.post('/logout')
        await router.push({ name: 'login' })
      } catch (error) {
        window.location.pathname = '/login'
      }
    },
  },
})
