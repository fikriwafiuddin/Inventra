import mongoose from "mongoose"
import ResponseError from "../error/error-response.js"
import Purchase from "../models/purchase-model.js"
import SupplierReturn from "../models/supplierReturn-model.js"
import supplierReturnValidation from "../validations/supplierReturn-validation.js"
import validation from "../validations/validation.js"
import Product from "../models/product-model.js"

const add = async (request, user) => {
  const { fracture, items, notes, date } = validation(
    supplierReturnValidation.add,
    request
  )

  const purchase = await Purchase.findOne({ user, fracture })
  if (!purchase) {
    throw new ResponseError("Purchase not found", 404)
  }

  const refundItems = []

  for (const item of items) {
    const purchaseItem = purchase.items.find((val) => val.id === item.id)

    if (purchaseItem) {
      refundItems.push({
        id: purchaseItem.product.id,
        name: purchaseItem.product.name,
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
      fracture,
      items: refundItems,
      notes,
      date,
    })
    await supplierReturn.save({ session })

    for (const item of refundItems) {
      const product = await Product.findOneAndUpdate(
        { _id: item._id, user, stock: { $gte: item.quantity } },
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

const supplierReturnService = {
  add,
}
export default supplierReturnService
