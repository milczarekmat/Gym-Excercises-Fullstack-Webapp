import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TrainingTemplateSchema = new Schema(
  {
    name: String,
    userId: String,
    exercises: [
      {
        id: String,
        bodyPart: String,
        equipment: String,
        target: String,
        name: String,
        gifUrl: String,
        secondaryMuscles: [String],
        instructions: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('TrainingTemplate', TrainingTemplateSchema)
