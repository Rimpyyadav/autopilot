import { Router } from 'express'
const router = Router()

import auth from '../middleware/auth.js'
import getTrendingTopics  from '../services/scraper.js'
import  {generatePosts}  from '../services/aiGenerator.js'

// Get trending topics
router.get('/trends/:niche', auth, async (req, res) => {
  const { niche } = req.params
  const topics = await getTrendingTopics(niche)
  res.json(topics)
})


// Generate posts using AI
router.get('/generate/:niche', auth, async (req, res) => {
  try {
    const { niche } = req.params
    const topics = await getTrendingTopics(niche)
    const posts = await generatePosts(niche, topics)

    res.json({ topics, posts })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


export default router