import mongoose from "mongoose"

const purchaseSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  supplier: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  fracture: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  items: [
    {
      product: {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
      quantity: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
})

const Purchase = mongoose.model("Purchase", purchaseSchema)
export default Purchase
