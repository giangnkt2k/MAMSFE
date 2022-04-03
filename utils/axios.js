import axios from 'axios'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import moment from 'moment'
import EventBus from '@/utils/eventBus'
import { getToken, destroyToken } from '@/utils/jwt'
const http = axios.create({
  baseURL: process.env.baseApi
})
const defaultLocale = process.env.defaultLang
const token = getToken()
const decodeToken = token ? jwt_decode(token) : {}
const currentTime = moment().format('X')
if (decodeToken && decodeToken.exp < Number(currentTime)) {
  destroyToken()
  window.location.href = '/login'
}
if (token) {
  http.defaults.headers.common.Authorization = 'Bearer ' + token
}
http.defaults.headers.post['Content-Type'] = 'application/json'
http.interceptors.request.use(
  (config) => {
    config.headers['Accept-Language'] = defaultLocale
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const status = error.response.status
    EventBus.$emit('responseStatusCode', status)
    return Promise.reject(error)
  }
)

export default http
