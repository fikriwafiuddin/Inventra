import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    uniqe: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  items: [
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      sku: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
})

const Order = mongoose.model("Order", orderSchema)
export default Order
