import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
  mongoose.set("strictQuery", true)
  const MONGODB_URI = process.env.MONGODB_URI
  if(!MONGODB_URI) return console.log("Mongodb can't connected to app")

  try {
    await mongoose.connect(MONGODB_URI)
    isConnected = true    
  } catch (error) {
    console.log(error, "Something error")
  }
}