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
  invoice: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
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
        sku: {
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
      unitPrice: {
        type: Number,
      },
    },
  ],
})

purchaseSchema.pre("save", function (next) {
  this.items.forEach((item) => {
    if (item.quantity > 0) {
      item.unitPrice = item.totalPrice / item.quantity
    } else {
      item.unitPrice = 0
    }
  })

  if (this.isModified("items")) {
    this.amount = this.items.reduce((total, item) => {
      return total + (item.totalPrice || 0)
    }, 0)
  }
  next()
})

const Purchase = mongoose.model("Purchase", purchaseSchema)
export default Purchase
