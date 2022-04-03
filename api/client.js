import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('client', { params })
}

export const add = async (params = {}) => {
  return await axios.post('client', params)
}

export const update = async (params = {}) => {
  return await axios.put(`client/${params.id}`, params)
}

export const details = async (id) => {
  return await axios.get(`client/${id}`)
}

export const destroy = async (id = {}) => {
  return await axios.delete(`client/${id}`)
}

export const importFile = async (data) => {
  return await axios.post('client/import', data)
}

export const importFileAvatar = async (data) => {
  return await axios.post('client/importAva', data)
}

export const deleteImg = async (data) => {
  return await axios.post('client/deleteImg', data)
}

export const deleteImgAva = async (data) => {
  return await axios.post('client/deleteImgAva', data)
}
