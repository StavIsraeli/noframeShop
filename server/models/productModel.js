import mongoose from "mongoose";
import Review from "./reviewModel"

const productSchema = mongoose.Schema({

    user:{
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    name:{
        type: String,
        require: true
    },
    image:{
        type: String,
        require: true
    },
    catagory:{
        type: String,
        require: true
    },
    reviews: [Review],
    rating:{
        type: Number,
        require: true, 
        default: 0
    },
    numReviews:{
        type: Number,
        require: true, 
        default: 0
    },
    price:{
        type: Number,
        require: true, 
        default: 0
    },
    countInStock:{
        type: Number,
        require: true, 
        default: 0
    }

}, {
    timestamps: true
})

const Product = mongoose.model('Product',productSchema)

export default Product