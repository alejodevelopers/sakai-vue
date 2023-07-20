import { defineStore } from 'pinia'
import { useApi } from '@/api/useAPI.js'

const api = useApi()

export const useUserStore = defineStore({
  id: 'user',
  state: () =>
    // Estado inicial que se recupera del almacenamiento local o utiliza valores predeterminados
    JSON.parse(localStorage.getItem('USER_INFO')) ?? {
      isLoggedIn: false,
      token: null,
      token_type: null,
      user: {
          id: null,
          name: null,
          email: null,
      }
    },

  actions: {
    // Actualiza el estado y guarda en el almacenamiento local
    updateState(payload) {
      let newUserState = { ...this.state, ...payload }
      localStorage.removeItem('USER_INFO')
      localStorage.setItem('USER_INFO', JSON.stringify(newUserState))
      this.$reset()
    },

    // Almacena la información del usuario obtenida del servidor
    async storeInfo() {
      let { data: userInfo } = await api.get('/user')
      localStorage.setItem('USER_INFO', JSON.stringify(userInfo))
      this.$reset()
    },
  },
});

