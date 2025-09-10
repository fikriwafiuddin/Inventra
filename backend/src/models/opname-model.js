import mongoose from "mongoose"

const opnameSchema = new mongoose.Schema({
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
      different: {
        type: Number,
        required: true,
      },
    },
  ],
})

opnameSchema.index({ user: 1, startDate: -1 }) // List opname terbaru per user
opnameSchema.index({ user: 1, status: 1 }) // Filter by status
opnameSchema.index({ user: 1, endDate: -1 }) // Completed opname history

// ✅ INDEX UNTUK REPORTING DAN ANALYTICS
opnameSchema.index({ user: 1, totalDifference: 1 }) // Opname dengan selisih terbesar
opnameSchema.index({ "items.sku": 1, user: 1 }) // Tracking opname history per produk
opnameSchema.index({ startDate: 1, endDate: 1 }) // Date range queries

// ✅ INDEX UNTUK QUERY PERFORMANCE
opnameSchema.index({ user: 1, name: 1 }) // Search by opname name
opnameSchema.index({ user: 1, "items.difference": 1 })

const Opname = mongoose.model("Opname", opnameSchema)
export default Opname
