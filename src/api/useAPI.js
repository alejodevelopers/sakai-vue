import axios from 'axios'
import middleware401 from './middleware401'
import middlewareCSRF from './middlewareCSRF'

/**
 * Inicializa una instancia de Axios para llamar a la API.
 * @param {string} endpoint 'web' o 'api' (por defecto)
 * @returns {AxiosInstance}
 */
export const useApi = (endpoint = 'api') => {
  const { API_HOST, API_PATH } = import.meta.env

  let baseURL

  if (endpoint === 'api') {
    baseURL = API_HOST + API_PATH || 'http://localhost:8000/api'
  } else if (endpoint === 'web') {
    baseURL = API_HOST || 'http://localhost:8000'
  }

  const axiosInstance = axios.create({
    baseURL,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials: true,
  })

  // Agrega el middleware CSRF a las solicitudes
  axiosInstance.interceptors.request.use(middlewareCSRF, err => Promise.reject(err))

  // Agrega el middleware 401 al manejar las respuestas
  axiosInstance.interceptors.response.use(resp => resp, middleware401)

  return axiosInstance
}
