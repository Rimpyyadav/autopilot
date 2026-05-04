import express, { json } from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'
import scraperRoutes from './routes/scraper.js'
import auth from './middleware/auth.js'
import startCronJob from './services/cronJob.js'
import postsRoutes from './routes/posts.js'
dotenv.config()


const app = express()
app.use(json())
dotenv.config()
app.use(cors({
  origin: ['http://localhost:5173', 'https://autopilot-1.onrender.com'],
  credentials: true
}))
startCronJob()

app.use('/api/scraper', scraperRoutes)
app.use('/api/posts', postsRoutes)
app.use(passport.initialize())


import authRoutes from './routes/auth.js'
app.use('/api/auth', authRoutes)


app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})


const PORT = process.env.PORT
connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})