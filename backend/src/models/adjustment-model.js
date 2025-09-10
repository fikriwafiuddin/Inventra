import mongoose from "mongoose"

const adjustmenSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
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
  },
  { timestamps: true }
)

adjustmenSchema.index({ user: 1, createdAt: -1 })
adjustmenSchema.index({ user: 1, "product.id": 1 })
adjustmenSchema.index({ user: 1, date: -1 })
adjustmenSchema.index({ "product.id": 1 })

const Adjustment = mongoose.model("Adjustment", adjustmenSchema)
export default Adjustment
