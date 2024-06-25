import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { GetData, PostData, PutData } from '../utils/apiCalls'
import type { TrainingTemplateModel } from '../models/TrainingTemplateModel'

interface IPersonalTrainingStore {
  templates: any[]
  setTemplates: (templates: any[]) => void
  pushTemplate: (template: any) => void
  fetchTemplates: () => Promise<void>
  errorMessage: null | string
  addTemplate: (template: TrainingTemplateModel) => Promise<void>
  updateTemplate: (template: TrainingTemplateModel) => Promise<void>
  updateTemplateLocally: (template: TrainingTemplateModel) => void
  saveTraining: (training: any) => Promise<any>
}

export const usePersonalTrainingStore = create<IPersonalTrainingStore>(
  devtools((set) => ({
    templates: [],
    setTemplates: (templates: any[]) => set({ templates }),
    fetchTemplates: async () => {
      try {
        const response = await GetData('/training/training-template')
        const templates = response.data
        set({ templates })
      } catch (err: any) {
        console.log('error', err.response.data.message)
        set({ errorMessage: err.response.data.message })
      }
    },
    addTemplate: async (template: TrainingTemplateModel) => {
      try {
        await PostData('/training/training-template', template)
      } catch (err: any) {
        console.log('error', err.response.data.message)
        set({ errorMessage: err.response.data.message })
      }
    },
    pushTemplate: (template: any) =>
      set((state) => ({ templates: [...state.templates, template] })),
    updateTemplate: async (template: TrainingTemplateModel) => {
      try {
        await PutData('/training/training-template', template)
      } catch (err: any) {
        console.log('error', err.response.data.message)
        set({ errorMessage: err.response.data.message })
      }
    },
    updateTemplateLocally: (template: TrainingTemplateModel) =>
      set((state) => ({
        templates: state.templates.map((t) =>
          t.id === template.id ? template : t,
        ),
      })),
    saveTraining: async (training: any) => {
      try {
        const result = await PostData('/training/training', training)
        return result
      } catch (err: any) {
        console.log('error', err.response.data.message)
        set({ errorMessage: err.response.data.message })
      }
    },
  })) as any, // Using `as any` to bypass the TypeScript error
)
