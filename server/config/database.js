import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect(process.env.MONGO_URI);
    
        console.log(`Successfully connected to MongoDB: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
      console.log(`Error connecting to MongoDB:${error.message}`.red.underline.bold);
      process.exit(1)
    }
  }

  export default connectDB
