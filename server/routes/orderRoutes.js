import express from 'express'
const router = express.Router()
import { addOrderItems, addOrderById, updateOrderToPaid, getLoggedInUserOrder } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getLoggedInUserOrder)
router.route('/:id').get(protect, addOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)



export default router