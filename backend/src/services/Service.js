import mongoose from "mongoose"
import logger from "../utils/logger.js"

class Service {
  static async withTransaction(callback) {
    const session = await mongoose.startSession()

    try {
      session.startTransaction()

      const result = await callback(session)

      await session.commitTransaction()
      await session.endSession()

      return result
    } catch (error) {
      await session.abortTransaction()
      await session.endSession()
      logger.error("Transaction failed", error)
      throw error
    }
  }
}

export default Service
