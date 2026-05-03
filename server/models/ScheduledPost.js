import { Schema, model } from 'mongoose'

const scheduledPostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  }, 
  niche: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'posted', 'failed'],
    default: 'pending'
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  postedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true })

export default model('ScheduledPost', scheduledPostSchema)