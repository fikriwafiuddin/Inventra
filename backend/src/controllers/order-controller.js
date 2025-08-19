import orderService from "../services/order-service.js"

const add = async (req, res, next) => {
  try {
    const request = req.body
    const user = req.user

    const order = await orderService.add(request, user)

    return res.status(200).json({
      message: "Order added successfully",
      body: { order },
    })
  } catch (error) {
    next(error)
  }
}

const orderController = {
  add,
}
export default orderController
