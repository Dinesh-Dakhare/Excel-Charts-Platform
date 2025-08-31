import express from 'express'
import {
  loginUser,
  registerUser,
  passwordChange,
  uploadImg,
  forgetPassword,
  resetPassword,
} from '../controllers/authController.js'
import authenticateToken from '../middleware/protected.js'
import { upload } from '../middleware/upload.js'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/password-change', authenticateToken, passwordChange)
router.post('/upload',authenticateToken, upload.single('profileImage'), uploadImg)
router.post('/forget-password', forgetPassword)
router.post('/reset-password', resetPassword)
export default router
