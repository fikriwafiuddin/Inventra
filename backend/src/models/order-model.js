import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      unique: true,
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
  },
  { timestamps: true }
)

orderSchema.index({ user: 1, date: -1 })
orderSchema.index({ user: 1, orderId: 1 })
orderSchema.index({ user: 1, amount: -1 })
orderSchema.index({ "items.sku": 1, user: 1 })

const Order = mongoose.model("Order", orderSchema)
export default Order
