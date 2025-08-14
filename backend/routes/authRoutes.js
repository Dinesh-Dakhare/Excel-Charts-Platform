import express from 'express'
import {
  loginUser,
  registerUser,
  passwordChange,
  uploadImg,
} from '../controllers/authController.js'
import authenticateToken from '../middleware/protected.js'
import { upload } from '../middleware/upload.js'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/password-change', authenticateToken, passwordChange)
router.post('/upload',authenticateToken, upload.single('profileImage'), uploadImg)
export default router
