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

const CustomerReturn = mongoose.model("CustomerReturn", customerReturnSchema)
export default CustomerReturn
