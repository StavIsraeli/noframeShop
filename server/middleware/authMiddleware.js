import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


//That middleware will help us to protect our data from requests from unknown sources, by cheking authorized by token.

const protect = AsyncHandler( async (req, res, next) => {

    let token 
    
    if(req.headers.authorization && req.headers.authorization.split(' ')[1]){
        try {
            token = req.headers.authorization.split(' ')[1]
      
            const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)
      
            req.user = await User.findById(decoded.id).select('-password')
      
            next()

          } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
          }

    }
    
    if(!token)
    {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const adminProtect = AsyncHandler( async (req, res, next) => {

  if(req.user && req.user.isAdmin){
    next()

  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  
  }

})


export { protect, adminProtect }