import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Customer } from '../models/CustomerModel'
import { GetData, PostData } from '../utils/apiCalls'

interface IUserStore {
  user: Customer | null
  setUser: (user: Customer | null) => void
  isLoggedIn: boolean
  errorMessage: null | string
  logout: () => void
  signUp: (email: string, password: string) => Promise<void>
  getProfile: () => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  setErrorMessage: (message: string | null) => void
  verifyToken: () => Promise<void>
}

export const useUserStore = create<IUserStore>(
  devtools((set) => ({
    user: null,
    isLoggedIn: false,
    errorMessage: null,
    setUser: (user: Customer | null) => set({ user }),
    logout: () => {
      set({ user: null, isLoggedIn: false })
      setAuthToken(null)
    },
    getProfile: async () => {
      try {
        const response = await GetData('/customer/profile')
        const user = response.data
        set({ user, isLoggedIn: true })
      } catch (err: any) {
        console.log('error', err.response.data.message)
        set({ errorMessage: err.response.data.message })
      }
    },
    verifyToken: async () => {
      try {
        const response = await GetData('/customer/verify-token')
        const user = response.data
        set({ user, isLoggedIn: true })
        console.log('user', user)
      } catch (err: any) {
        console.log('error', err.response.data.message)
        // set({ errorMessage: err.response.data.message })
      }
    },
    signUp: async (email: string, password: string) => {
      try {
        const response = await PostData('/customer/signup', {
          email,
          password,
        })
        const { token } = response.data
        await setAuthToken(token)

        set({ errorMessage: null })

        const store = useUserStore.getState()
        await store.getProfile()
      } catch (err: any) {
        console.log('error', err.response.data.message)
        set({ errorMessage: err.response.data.message })
      }
    },
    signIn: async (email: string, password: string) => {
      try {
        const response = await PostData('/customer/login', {
          email,
          password,
        })
        const { token } = response.data
        await setAuthToken(token)

        set({ errorMessage: null })

        const store = useUserStore.getState()
        await store.getProfile()
      } catch (err: any) {
        console.log('error', err.response.data.message)
        set({ errorMessage: err.response.data.message })
      }
    },
    setErrorMessage: (errorMessage: string | null) => set({ errorMessage }),
  })) as any, // Using `as any` to bypass the TypeScript error
)

async function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem('token', token)
  } else {
    localStorage.clear()
  } 
}
