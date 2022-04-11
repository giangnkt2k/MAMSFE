import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('electric', { params })
}

export const add = async (params = {}) => {
  return await axios.post('electric', params)
}

export const update = async (params = {}) => {
  return await axios.put(`electric/${params.id}`, params)
}

export const details = async (id) => {
  return await axios.get(`electric/${id}`)
}

export const destroy = async (id = {}) => {
  return await axios.delete(`electric/${id}`)
}

export const importFile = async (data) => {
  return await axios.post('electric/import', data)
}

export const importFileAvatar = async (data) => {
  return await axios.post('electric/importAva', data)
}

export const deleteImg = async (data) => {
  return await axios.post('electric/deleteImg', data)
}

export const deleteImgAva = async (data) => {
  return await axios.post('electric/deleteImgAva', data)
}
