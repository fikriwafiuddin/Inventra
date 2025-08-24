import ResponseError from "../error/error-response.js"
import CustomerReturn from "../models/customerReturn-model.js"
import Order from "../models/order-model.js"
import customerReturnValidation from "../validations/customerReturn-validation.js"
import validation from "../validations/validation.js"

const add = async (request, user) => {
  const { orderId, items, notes, date } = validation(
    customerReturnValidation.add,
    request
  )

  const order = await Order.findOne({ orderId, user })
  if (!order) {
    throw new ResponseError("Order not found", 404)
  }

  let totalRefund = 0
  const refundItems = []
  const orderItems = order.items

  for (const item of items) {
    const orderItem = orderItems.find((val) => item.id === val.id)

    if (orderItem) {
      refundItems.push({
        id: orderItem.id,
        name: orderItem.name,
        quantity: item.quantity,
        condition: item.condition,
        price: orderItem.price,
      })

      totalRefund += orderItem.price * item.quantity
    }
  }

  const customerReturn = await CustomerReturn.create({
    user,
    orderId,
    items: refundItems,
    notes,
    totalRefund,
    date,
  })

  return customerReturn
}

const customerReturnService = {
  add,
}
export default customerReturnService
