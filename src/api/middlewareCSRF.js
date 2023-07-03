import axios from 'axios'

const getCookiesArray = () =>
  document.cookie.split(';').reduce((cookieArray, cookie) => {
    let [key] = cookie.split('=')
    if (key) cookieArray.push(key.trim())
    return cookieArray
  }, [])

/**
 * Si el método HTTP es `post | put | delete` y la cookie XSRF-TOKEN no está presente,
 * llama a '/sanctum/csrf-cookie' para establecer el token CSRF y luego procede con la solicitud inicial.
 * @param {AxiosRequestConfig} axiosconfig
 * @returns {Promise<AxiosRequestConfig>}
 */
const middlewareCSFR = async axiosconfig => {
  let cookies = getCookiesArray()
  let isTokenMissing = !cookies.includes('XSRF-TOKEN')

  let methodsNeedCSRF = ['post', 'put', 'delete'] // otros métodos que desees agregar aquí
  let doesMethodRequireCSRF = methodsNeedCSRF.includes(axiosconfig.method)

  if (isTokenMissing && doesMethodRequireCSRF) {
    // Primero obtenemos el token CSRF
    let pathCSFR = '/sanctum/csrf-cookie'
    let urlToCall = `${import.meta.env.API_HOST || 'http://localhost:8000'}${pathCSFR}`

    await axios.get(urlToCall, { withCredentials: true })
    // Luego continuamos con la solicitud
    return axiosconfig
  }

  return axiosconfig
}

export { middlewareCSFR as default }
