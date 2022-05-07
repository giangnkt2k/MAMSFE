import Cookies from 'js-cookie'
const ID_TOKEN_KEY = 'access_token'

export const getToken = () => {
  return Cookies.get(ID_TOKEN_KEY)
}

export const saveToken = (token) => {
  Cookies.set(ID_TOKEN_KEY, token, { expires: 7 })
}

export const destroyToken = () => {
  Cookies.remove(ID_TOKEN_KEY)
  Cookies.remove('role')
}
