import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productController.js'
import { adminProtect, protect } from '../middleware/authMiddleware.js'


router.route('/')
.get(getProducts)
.post(protect, adminProtect, createProduct)

router.route('/top')
.get(getTopProducts)

router.route('/:id/reviews')
.post(protect, createProductReview)

router.route('/:id')
  .get(getProductById)
  .delete(protect, adminProtect, deleteProduct)
  .put(protect, adminProtect, updateProduct)


export default router