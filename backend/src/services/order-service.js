import orderValidation from "../validations/order-validation.js"
import validation from "../validations/validation.js"
import Product from "../models/product-model.js"
import ResponseError from "../error/error-response.js"
import Order from "../models/order-model.js"
import mongoose from "mongoose"

const add = async (request, user) => {
  const { items, date } = validation(orderValidation.add, request)

  const productIds = items.map((it) => it._id)
  const products = await Product.find({ _id: { $in: productIds } })

  if (products.length !== items.length) {
    throw new ResponseError("Some products not found", 404)
  }

  for (const item of items) {
    const product = products.find((p) => String(p._id) === item._id)
    if (!product) {
      throw new ResponseError(`Product ${item._id} not found`, 404)
    }
    if (product.stock < item.quantity) {
      throw new ResponseError(
        `Stock not enough for product ${product.name}`,
        400
      )
    }
  }

  const orderItems = []
  let totalAmount = 0

  for (const item of items) {
    const product = products.find((p) => String(p._id) === item._id)
    const price = product.price
    const subtotal = price * item.quantity
    totalAmount += subtotal

    orderItems.push({
      id: product._id,
      name: product.name,
      quantity: item.quantity,
      price,
    })
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const today = new Date()
    const dateStr = today.toISOString().slice(2, 10).replace(/-/g, "")
    const rand = Math.floor(1000 + Math.random() * 9000)
    const orderId = `ORD-${dateStr}-${rand}`

    const order = new Order({
      user,
      orderId,
      amount: totalAmount,
      date,
      items: orderItems,
    })
    await order.save({ session })

    for (const item of items) {
      await Product.updateOne(
        { _id: item._id },
        {
          $inc: { stock: -item.quantity, sold: item.quantity },
        },
        { session }
      )
    }

    await session.commitTransaction()
    session.endSession()

    return order
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

const getAll = async (user) => {
  const orders = await Order.find({ user })

  return orders
}

const orderService = {
  add,
  getAll,
}
export default orderService
