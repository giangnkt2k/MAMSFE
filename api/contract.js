import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('contract', { params })
}

export const add = async (params = {}) => {
  return await axios.post('contract', params)
}

export const update = async (params = {}) => {
  return await axios.put(`contract/${params.id}`, params)
}

export const importFile = async (data) => {
  return await axios.post('contract/import', data)
}

export const deleteImg = async (data) => {
  return await axios.post('contract/deleteImg', data)
}

export const details = async (id) => {
  return await axios.get(`contract/${id}`)
}

export const destroy = async (id = {}) => {
  return await axios.delete(`contract/${id}`)
}
