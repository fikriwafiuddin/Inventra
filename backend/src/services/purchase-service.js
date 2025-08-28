import mongoose from "mongoose"
import ResponseError from "../error/error-response.js"
import Supplier from "../models/supplier-model.js"
import validation from "../validations/validation.js"
import Product from "../models/product-model.js"
import Purchase from "../models/purchase-model.js"
import purchaseValidation from "../validations/purchase-validation.js"
import stockMovementService from "./stockMovement-service.js"

const add = async (request, user) => {
  const {
    supplier: supplierId,
    fracture,
    date,
    items,
  } = validation(purchaseValidation.add, request)

  const supplier = await Supplier.findOne({ user, _id: supplierId })
  if (!supplier) {
    throw new ResponseError("Supplier not found", 404)
  }

  const mergedMap = new Map()
  for (const it of items) {
    const pid = String(it.product)
    const q = Number(it.quantity) || 0
    if (mergedMap.has(pid)) mergedMap.set(pid, mergedMap.get(pid) + q)
    else mergedMap.set(pid, q)
  }
  const productIds = [...mergedMap.keys()]

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const products = await Product.find({
      _id: { $in: productIds },
      user,
    }).session(session)

    if (products.length !== productIds.length) {
      throw new ResponseError("Some products were not found", 404)
    }

    const productById = new Map(products.map((p) => [String(p._id), p]))
    const finalItems = []

    for (const [pid, qty] of mergedMap.entries()) {
      const p = productById.get(pid)
      const unitPrice = Number(p.price) || 0
      const lineTotal = unitPrice * qty

      finalItems.push({
        product: {
          id: String(p._id),
          name: p.name,
        },
        quantity: qty,
        totalPrice: lineTotal,
      })
    }

    const purchase = new Purchase({
      user: String(user),
      supplier: {
        id: String(supplier._id),
        name: supplier.name,
      },
      fracture,
      date: new Date(date),
      items: finalItems,
    })
    await purchase.save({ session })

    const bulkOps = []
    for (const [pid, qty] of mergedMap.entries()) {
      bulkOps.push({
        updateOne: {
          filter: { _id: pid, user: user },
          update: { $inc: { stock: qty } },
        },
      })
    }
    if (bulkOps.length) {
      await Product.bulkWrite(bulkOps, { session })
    }

    for (const [pid, qty] of mergedMap.entries()) {
      const p = productById.get(pid)
      await stockMovementService.add({
        session,
        user,
        product: p,
        qtyChange: qty,
        movementType: "purchase",
        sourceId: purchase._id,
        reason: `Purchase from supplier ${supplier.name}`,
      })
    }

    await session.commitTransaction()
    session.endSession()

    return purchase.toObject()
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

const getAll = async (user) => {
  const purchases = await Purchase.find(
    { user },
    { fracture: 1, supplier: 1, date: 1 }
  )
  return purchases
}

const detail = async (fracture, user) => {
  const purchase = await Purchase.findOne({ fracture, user })
  if (!purchase) {
    throw new ResponseError("Purchase not found", 404)
  }

  return purchase
}

const purchaseService = {
  add,
  getAll,
  detail,
}
export default purchaseService
