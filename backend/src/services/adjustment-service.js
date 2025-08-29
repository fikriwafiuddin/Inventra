import mongoose from "mongoose"
import ResponseError from "../error/error-response.js"
import Product from "../models/product-model.js"
import adjustmenValidation from "../validations/adjustment-validation.js"
import validation from "../validations/validation.js"
import Adjustment from "../models/adjustment-model.js"
import stockMovementService from "./stockMovement-service.js"

const add = async (request, user) => {
  const {
    quantity,
    reason,
    product: productId,
  } = validation(adjustmenValidation.add, request)

  const product = await Product.findOne({ user, _id: productId })
  if (!product) {
    throw new ResponseError("Product not found")
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    product.stock += quantity
    await product.save({ session })

    const adjustment = new Adjustment({
      user,
      quantity,
      reason,
      product: {
        id: product._id,
        name: product.name,
      },
    })
    await adjustment.save({ session })

    await stockMovementService.add({
      session,
      user,
      product,
      qtyChange: quantity,
      movementType: "adjustment",
      sourceId: adjustment._id,
      reason,
    })

    await session.commitTransaction()
    session.endSession()

    return adjustment
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

const getAll = async (user) => {
  const adjustments = await Adjustment.find({ user })
  return adjustments
}

const adjustmentService = {
  add,
  getAll,
}
export default adjustmentService
