import { Router } from 'express'
import { genSalt, hash, compare } from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js'
import passport from '../config/passport.js'

const { JsonWebTokenError } = jwt;
const router = Router()
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-passwordHash')

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})
router.post('/register', async (req, res) => {
  try {
    console.log("BODY:", req.body)

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const salt = await genSalt(10)
    const passwordHash = await hash(password, salt)

    const user = new User({ name, email, passwordHash })
    await user.save()

    res.status(201).json({ message: 'User registered successfully' })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})
//login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan
      }
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

//google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {

    if (!req.user) {
      return res.status(401).send('Authentication failed')
    }

    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.redirect(`http://localhost:5173/dashboard?token=${token}`)
  }
)

export default router