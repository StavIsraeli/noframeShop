import express from 'express'
const router = express.Router()
import { addOrderItems, addOrderById, updateOrderToPaid, getLoggedInUserOrder, getAllOrders, updateOrderToDelivered } from '../controllers/orderController.js'
import { protect, adminProtect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, adminProtect, getAllOrders)
router.route('/myorders').get(protect, getLoggedInUserOrder)
router.route('/:id').get(protect, addOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, adminProtect, updateOrderToDelivered)



export default router