import axios from '@/utils/axios'

export const currentUser = async () => {
  return await axios.get('profile')
}

export const list = async (params = {}) => {
  return await axios.get('user', { params })
}

export const listAllocation = async (params = {}) => {
  return await axios.get('user/vehicle_allocation', { params })
}

export const add = async (params = {}) => {
  return await axios.post('user', params)
}

export const update = async (params = {}) => {
  return await axios.put(`user/${params.id}`, params)
}

export const details = async (id) => {
  return await axios.get(`user/${id}`)
}

export const destroy = async (id = {}) => {
  return await axios.post('user/delete', id)
}
