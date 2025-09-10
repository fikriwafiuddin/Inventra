import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
)

categorySchema.index({ user: 1 })
categorySchema.index({ user: 1, createdAt: -1 })
categorySchema.index({ user: 1, updatedAt: -1 })

const Category = mongoose.model("Category", categorySchema)
export default Category
