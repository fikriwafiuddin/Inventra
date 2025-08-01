import mongoose from "mongoose"
import logger from "./logger.js"

mongoose.set("debug", (collection, method, query, doc) => {
  logger.info(
    `[MONGO] ${collection}.${method} ${JSON.stringify(query)} ${JSON.stringify(
      doc
    )}`
  )
})

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    logger.info("MongoDB connected successfully")
  } catch (error) {
    logger.error("MongoDB connection failed:", error)
    process.exit(1)
  }
}

export default connectDB
