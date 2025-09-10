import mongoose from "mongoose"

const supplierSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
)

supplierSchema.index({ user: 1, name: 1 })

const Supplier = mongoose.model("Supplier", supplierSchema)
export default Supplier
