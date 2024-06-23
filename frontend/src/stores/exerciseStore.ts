import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { GetData, PostData } from '../utils/apiCalls'

interface IExerciseStore {
  exercises: any[]
  setExercises: (exercises: any[]) => void
  bodyPart: string
  setBodyPart: (bodyPart: string) => void
}

export const useExerciseStore = create<IExerciseStore>(
  devtools((set) => ({
    bodyPart: 'all',
    setBodyPart: (bodyPart: string) => set({ bodyPart }),
    exercises: [],
    setExercises: (exercises: any[]) => set({ exercises }),
  })) as any, // Using `as any` to bypass the TypeScript error
)
