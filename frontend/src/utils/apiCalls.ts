import api from 'axios'

api.defaults.baseURL = 'http://localhost:80/'

export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': 'c59a6a9012mshaec7b3bbbece83fp1b12d0jsne1ebff30419e',
  },
}

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': 'c59a6a9012mshaec7b3bbbece83fp1b12d0jsne1ebff30419e',
  },
}

function setHeader() {
  const token = localStorage.getItem('token')
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export async function GetDataWithHeaders(
  endPoint: string,
  options: RequestInit,
  isAuthHeader: boolean,
) {
  if (isAuthHeader) setHeader()

  const res = await fetch(endPoint, options)
  const data = await res.json()

  return data
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
