import express from 'express'
import products from './data/products.js'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import colors from 'colors'


dotenv.config()
connectDB()
let app= express();
app.use(cors())
app.use(express.json());

app.get('/', (req, res) =>
  res.send('API is running...')
)

app.get('/api/products', (req, res) =>
  res.json(products)
)

app.get('/api/products/:id', (req, res) =>{
    const product = products.find((product) => product._id === req.params.id )
    res.json(product)
}
    
)


const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)); 
