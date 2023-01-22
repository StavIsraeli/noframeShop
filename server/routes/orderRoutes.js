import express from 'express'
const router = express.Router()
import { addOrderItems, addOrderById, updateOrderToPaid } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, addOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)


export default router