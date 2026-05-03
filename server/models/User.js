import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    enum: ['free', 'pro'],
    default: 'free'
  },
  googleId: {
  type: String,
  default: null
},
passwordHash: {
  type: String,
  required: false,
  default: null
},
niche: {
  type: String,
  default: 'technology'
}
}, { timestamps: true })

export default model('User', userSchema)