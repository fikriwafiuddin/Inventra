import mongoose from "mongoose"

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      index: true,
    },
    supplier: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
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
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    items: [
      {
        product: {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true,
          },
          sku: {
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
  },
  { timestamps: true }
)

purchaseSchema.index({ user: 1, date: -1 })
purchaseSchema.index({ user: 1, invoice: 1 })
purchaseSchema.index({ user: 1, amount: -1 })
purchaseSchema.index({ "items.sku": 1, user: 1 })

purchaseSchema.pre("save", function (next) {
  if (this.isModified("items")) {
    this.totalAmount = this.items.reduce((total, item) => {
      return total + (item.totalPrice || 0)
    }, 0)
  }
  next()
})

const Purchase = mongoose.model("Purchase", purchaseSchema)
export default Purchase
