import mongoose from "mongoose"

const opnameSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["completed", "incomplete"],
      default: "incomplete",
    },
    totalDifference: {
      type: Number,
      default: 0,
    },
    items: [
      {
        id: {
          type: String,
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
        price: {
          type: Number,
          required: true,
        },
        systemStock: {
          type: Number,
          required: true,
        },
        physicalStock: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Opname = mongoose.model("Opname", opnameSchema)
export default Opname
