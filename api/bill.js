import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('room', { params })
}

export const listForBill = async (params = {}) => {
  return await axios.get('room/indexForBill', { params })
}

export const listBillByDate = async (params = {}) => {
  return await axios.get('bill/indexByDate', { params })
}

export const addOne = async (params = {}) => {
  return await axios.post('bill', params)
}

export const addMany = async (params = {}) => {
  return await axios.post('bill/addMany', params)
}

export const sendBillEmail = async (params = {}) => {
  return await axios.get('sendBillEmail', { params })
}

export const update = async (params = {}) => {
  return await axios.put(`bill/${params.id}`, params)
}

export const details = async (id) => {
  return await axios.get(`room/${id}`)
}

export const destroy = async (id = {}) => {
  return await axios.delete(`room/${id}`)
}
