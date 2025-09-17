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
    },
  },
  { timestamps: true }
)

const Category = mongoose.model("Category", categorySchema)
export default Category
