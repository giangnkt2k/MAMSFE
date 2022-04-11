import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('water', { params })
}

export const add = async (params = {}) => {
  return await axios.post('water', params)
}

export const update = async (params = {}) => {
  return await axios.put(`water/${params.id}`, params)
}

export const details = async (id) => {
  return await axios.get(`water/${id}`)
}

export const destroy = async (id = {}) => {
  return await axios.delete(`water/${id}`)
}

export const importFile = async (data) => {
  return await axios.post('water/import', data)
}

export const importFileAvatar = async (data) => {
  return await axios.post('water/importAva', data)
}

export const deleteImg = async (data) => {
  return await axios.post('water/deleteImg', data)
}

export const deleteImgAva = async (data) => {
  return await axios.post('water/deleteImgAva', data)
}
