import mongoose from "mongoose"

const adjustmenSchema = new mongoose.Schema({
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
})

const Adjustment = mongoose.model("Adjustment", adjustmenSchema)
export default Adjustment
