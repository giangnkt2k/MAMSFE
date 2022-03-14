import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('building', { params })
}

export const add = async (params = {}) => {
  return await axios.post('building', params)
}

export const update = async (params = {}) => {
  return await axios.put(`building/${params.id}`, params)
}

export const importFile = async (data) => {
  return await axios.post('building/import', data)
}

export const deleteImg = async (data) => {
  return await axios.post('building/deleteImg', data)
}

export const details = async (id) => {
  return await axios.get(`building/${id}`)
}

export const destroy = async (id = {}) => {
  return await axios.delete(`building/${id}`)
}
