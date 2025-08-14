import { User } from '../models/userSchema.js'

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const user = new User({ username, email, password })
    await user.save()

    const token = await user.generateToken()
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const token = await user.generateToken()
    res.status(200).json({
      message: 'User logged in successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const passwordChange = async (req, res) => {
  try {
    // const { passwordData } = req.body
    const { currentPassword, newPassword } = req.body
    const userId = req.user.id
  if(!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'All fields are required' })
  }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    user.password = newPassword
    await user.save()
    res.status(200).json({ message: 'Password updated successfully' })
  } catch (error) {
    console.log(error)
  }
}

export const uploadImg =async(req, res)=>{
  try {
    console.log("hi!");
    
//   const userId = req.user.id
    const profileImage = req.file ? req.file.filename : null;
console.log(profileImage);

//    const user = await User.findById(userId)
//     if (!user) {
//       return res.status(400).json({ message: 'User not found' })
//     }
//     user.profileImage = profileImage

//     await user.save();

//     res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}