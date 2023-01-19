import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.post('/login', authUser)

export default router