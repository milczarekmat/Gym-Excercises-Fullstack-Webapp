import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CustomerSchema = new Schema(
  {
    email: String,
    password: String,
    salt: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password
        delete ret.salt
        delete ret.__v
      },
    },
    timestamps: true,
  }
)

export default mongoose.model('Customer', CustomerSchema)
