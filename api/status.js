import axios from '@/utils/axios'

export const currentstatus = async () => {
  return await axios.get('profile')
}

export const list = async (params = {}) => {
  return await axios.get('status', { params })
}

export const add = async (params = {}) => {
  return await axios.post('status', params)
}

export const update = async (params = {}) => {
  return await axios.put(`status/${params.id}`, params)
}

export const details = async (id) => {
  return await axios.get(`status/${id}`)
}

export const destroy = async (id = {}) => {
  return await axios.post('status/delete', id)
}

export const sendtoAdmin = async (params = {}) => {
  return await axios.get('sendtoAdmin', { params })
}
