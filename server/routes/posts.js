import { Router } from 'express'
const router = Router()
import auth from '../middleware/auth.js'
import ScheduledPost from '../models/ScheduledPost.js'

router.get('/', auth, async (req, res) => {
  try {
    const posts = await ScheduledPost.find({ userId: req.userId })
      .sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router