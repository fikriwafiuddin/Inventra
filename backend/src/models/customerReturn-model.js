import mongoose from "mongoose"

const customerReturnSchema = new mongoose.Schema({
  user: {
    type: String,
    reuired: true,
  },
  orderId: {
    type: String,
    reuired: true,
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
      condition: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalRefund: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
})

customerReturnSchema.index({ user: 1, date: -1 })
customerReturnSchema.index({ user: 1, orderId: 1 })
customerReturnSchema.index({ date: 1 })
customerReturnSchema.index({ "items.condition": 1 })
customerReturnSchema.index({ user: 1, date: 1, totalRefund: -1 })

const CustomerReturn = mongoose.model("CustomerReturn", customerReturnSchema)
export default CustomerReturn
