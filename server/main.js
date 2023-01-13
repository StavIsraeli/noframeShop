import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import colors from 'colors'
import productRoutes from './routes/productRoute.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()
let app= express();
app.use(cors())
app.use(express.json());

app.get('/', (req, res) =>
  res.send('API is running...')
)

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)); 
