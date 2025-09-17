import mongoose from "mongoose"
import ResponseError from "../error/error-response.js"
import Purchase from "../models/purchase-model.js"
import SupplierReturn from "../models/supplierReturn-model.js"
import supplierReturnValidation from "../validations/supplierReturn-validation.js"
import validation from "../validations/validation.js"
import Product from "../models/product-model.js"
import stockMovementService from "./stockMovement-service.js"

const add = async (request, user) => {
  const { invoice, items, notes, date } = validation(
    supplierReturnValidation.add,
    request
  )

  const purchase = await Purchase.findOne({ user, invoice })
  if (!purchase) {
    throw new ResponseError("Purchase not found", 404)
  }

  const refundItems = []

  for (const item of items) {
    const purchaseItem = purchase.items.find(
      (val) => val.product.id === item.id
    )

    if (purchaseItem) {
      refundItems.push({
        id: purchaseItem.product.id,
        name: purchaseItem.product.name,
        sku: purchaseItem.product.sku,
        condition: item.condition,
        quantity:
          item.quantity > purchaseItem.quantity
            ? purchaseItem.quantity
            : item.quantity,
      })
    }
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const supplierReturn = new SupplierReturn({
      user,
      invoice,
      items: refundItems,
      notes,
      date,
    })
    await supplierReturn.save({ session })

    for (const item of refundItems) {
      const product = await Product.findOneAndUpdate(
        { _id: item.id, user, stock: { $gte: item.quantity } },
        {
          $inc: { stock: -item.quantity, sold: item.quantity },
        },
        { session, new: true }
      )

      if (!product) {
        throw new ResponseError(
          `Product ${item.name} tidak ditemukan atau stok tidak cukup`
        )
      }

      await stockMovementService.add({
        session,
        user,
        product,
        qtyChange: -item.quantity,
        movementType: "supplierReturn",
        sourceId: supplierReturn._id,
        reason: "Supplier return",
      })
    }

    await session.commitTransaction()
    session.endSession()

    return supplierReturn
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

const getAll = async (request, user) => {
  const { start, end } = validation(supplierReturnValidation.getAll, request)

  const supplierReturns = await SupplierReturn.find({
    user,
    date: {
      $gte: start,
      $lte: end,
    },
  })

  return supplierReturns
}

const supplierReturnService = {
  add,
  getAll,
}
export default supplierReturnService
