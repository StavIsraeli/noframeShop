import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, getUsers, registerUser, updateUserProfile } from '../controllers/userController.js'
import { adminProtect, protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, adminProtect, getUsers)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.post('/login', authUser)

export default router