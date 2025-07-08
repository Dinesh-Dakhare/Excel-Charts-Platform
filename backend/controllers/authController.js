import { User } from '../models/userSchema.js'

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const user = new User({ username, email, password, role: role || 'user' })
    await user.save()

    const token = await user.generateToken()
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
   res.status(500).json({ message: 'Server error', error: error.message });
  }
}
