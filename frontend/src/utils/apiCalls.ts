import api from 'axios'

api.defaults.baseURL = 'http://localhost:8001/'

function setHeader() {
  const token = localStorage.getItem('token')
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export async function GetData(endPoint: string) {
  setHeader()
  const response = await api.get(endPoint)
  return response
}

export async function PostData(endPoint: string, options: unknown) {
  setHeader()
  const response = await api.post(endPoint, options)
  return response
}

export async function PutData(endPoint: string, options: unknown) {
  setHeader()
  const response = await api.put(endPoint, options)
  return response
}

export async function DeleteData(endPoint: string) {
  setHeader()
  const response = await api.delete(endPoint)
  return response
}
