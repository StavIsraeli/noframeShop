import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    rating:{
        type: Number,
        require: true,
        default: 0
    },
    comment:{
        type: String,
        require: true
    }

}, {
    timestamps: true
})

const Review = mongoose.model('Review',reviewSchema)

export default Review