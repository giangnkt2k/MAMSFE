import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('room', { params })
}

export const listWaterCollections = async (params = {}) => {
  return await axios.get('room/collectWater', { params })
}
export const add = async (params = {}) => {
  return await axios.post('room', params)
}

export const update = async (params = {}) => {
  return await axios.put(`room/${params.id}`, params)
}

export const importFile = async (data) => {
  return await axios.post('room/import', data)
}

export const deleteImg = async (data) => {
  return await axios.post('room/deleteImg', data)
}

export const details = async (id) => {
  return await axios.get(`room/${id}`)
}

export const destroy = async (id = {}) => {
  return await axios.delete(`room/${id}`)
}
