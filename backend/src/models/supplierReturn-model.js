import mongoose from "mongoose"

const supplierReturnSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    invoice: {
      type: String,
      required: true,
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
        sku: {
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
      },
    ],
    notes: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

const SupplierReturn = mongoose.model("SupplierReturn", supplierReturnSchema)
export default SupplierReturn
