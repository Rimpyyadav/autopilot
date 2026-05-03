import { schedule } from 'node-cron'
import  getTrendingTopics  from './scraper.js'
import { generatePosts } from './aiGenerator.js'
import ScheduledPost from '../models/ScheduledPost.js'
import User from '../models/User.js'
import sendDigestEmail from './emailService.js'
const startCronJob = () => {
  // Har 2 minute mein run karega testing ke liye
  // Production mein '0 9 * * *' — roz subah 9 baje
  schedule('*/1 * * * *', async () => {
    console.log('Cron running — generating posts...')

    try {
      const users = await User.find({ plan: 'free' })

      for (const user of users) {

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const existingPost = await ScheduledPost.findOne({
          userId: user._id,
          createdAt: { $gte: today }
        })

        if (existingPost) {
          console.log(`Already posted for ${user.email} today — skipping`)
          continue
        }

        const niche = user.niche || 'technology'
        const topics = await getTrendingTopics(niche)
        const posts = await generatePosts(niche, topics)

        if (posts.length > 0) {
          const scheduledPost = new ScheduledPost({
            userId: user._id,
            content: posts[0].post,
            niche: niche,
            status: 'pending',
            scheduledAt: new Date()
          })

          await scheduledPost.save()
          console.log(`Post saved for user: ${user.email}`)
          await sendDigestEmail(user.email, user.name, posts[0].post, niche)
        }
      }
    } catch (error) {
      console.log('Cron error:', error.message)
    }
  })
}

export default startCronJob 