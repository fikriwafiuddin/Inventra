import mongoose from "mongoose"

const stockBatchSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    Purchase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchase",
    },
    receivedDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    unitCost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const StockBatch = mongoose.model("StockBatch", stockBatchSchema)
export default StockBatch
