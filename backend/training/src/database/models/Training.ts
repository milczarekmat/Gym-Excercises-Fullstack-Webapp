import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TrainingSchema = new Schema(
  {
    template: {
      type: Schema.Types.ObjectId,
      ref: 'TrainingTemplate',
      require: true,
    },
    userId: String,
    date: Date,
    details: [
      {
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
        sets: [
          {
            reps: Number,
            weight: Number,
            exerciseId: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Training', TrainingSchema)
