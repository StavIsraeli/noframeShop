import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct
} from '../controllers/productController.js'
import { adminProtect, protect } from '../middleware/authMiddleware.js'


router.route('/')
.get(getProducts)
.post(protect, adminProtect, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, adminProtect, deleteProduct)
  .put(protect, adminProtect, updateProduct)


export default router