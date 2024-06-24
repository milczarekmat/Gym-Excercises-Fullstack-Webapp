import type { ExerciseModel } from './ExerciseModel'

export interface TrainingTemplateModel {
  name: string
  userId: string
  exercises: ExerciseModel[]
}
