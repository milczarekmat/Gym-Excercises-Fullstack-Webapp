import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { GetData, PostData } from '../utils/apiCalls'
import { TrainingTemplateModel } from '../models/TrainingTemplateModel'

interface IPersonalTrainingStore {
  templates: any[]
  setTemplates: (templates: any[]) => void
  fetchTemplates: () => Promise<void>
  errorMessage: null | string
}

export const usePersonalTrainingStore = create<IPersonalTrainingStore>(
  devtools((set) => ({
    templates: [],
    setTemplates: (templates: any[]) => set({ templates }),
    fetchTemplates: async () => {
      try {
        const response = await GetData('/training-template')
        const templates = response.data
        set({ templates })
      } catch (err: any) {
        console.log('error', err.response.data.message)
        set({ errorMessage: err.response.data.message })
      }
    },
    addTemplate: async (template: TrainingTemplateModel) => {
      try {
        await PostData('/training-template', template)
      } catch (err: any) {
        console.log('error', err.response.data.message)
        set({ errorMessage: err.response.data.message })
      }
    },
  })) as any, // Using `as any` to bypass the TypeScript error
)
