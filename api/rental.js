import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('rental', { params })
}

export const add = async (params = {}) => {
  return await axios.post('rental', params)
}

export const update = async (params = {}) => {
  return await axios.put(`rental/${params.id}`, params)
}

export const importFile = async (data) => {
  return await axios.post('rental/import', data)
}

export const deleteImg = async (data) => {
  return await axios.post('rental/deleteImg', data)
}

export const details = async (id) => {
  return await axios.get(`rental/${id}`)
}

export const destroy = async (id = {}) => {
  return await axios.delete(`rental/${id}`)
}
