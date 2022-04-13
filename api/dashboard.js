import axios from '@/utils/axios'

export const clientsInBuilding = async (params = {}) => {
  return await axios.get('dashboard/clientsInBuilding', { params })
}

export const roomStatus = async (params = {}) => {
  return await axios.get('dashboard/roomStatus', { params })
}

export const indexNUmberByDateInBuilding = async (params = {}) => {
  return await axios.get('dashboard/indexNUmberByDateInBuilding', { params })
}

export const listRoomNotPaied = async (params = {}) => {
  return await axios.get('dashboard/listRoomNotPaied', { params })
}

export const list = async (params = {}) => {
  return await axios.get('dashboard', { params })
}
