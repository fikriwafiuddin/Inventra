import mongoose from "mongoose"

const stockMovementSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    product: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
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
    movementType: {
      type: String,
      required: true,
      enum: [
        "adjustment",
        "customerReturn",
        "supplierReturn",
        "opname",
        "sales",
        "purchase",
      ],
    },
    sourceId: {
      type: String,
      required: true,
    },
    initialStock: {
      type: Number,
      required: true,
    },
    finalStock: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
)

const StockMovement = mongoose.model("StockMovement", stockMovementSchema)
export default StockMovement
