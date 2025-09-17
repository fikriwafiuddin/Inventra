import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    minStock: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      cloudinaryId: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
)

productSchema.pre("save", async function (next) {
  if (this.isNew && !this.sku) {
    this.sku = await generateSKU(this.user, this.name, this.category)
  }

  if (
    this.isModified("stock") &&
    this.stock > this.get("stock", null, { getters: false })
  ) {
    this.lastRestock = new Date()
  }

  next()
})

productSchema.statics.generateSKU = async function (
  userId,
  productName,
  categoryId
) {
  const category = await mongoose.model("Category").findById(categoryId)
  const categoryCode = category?.name?.substring(0, 3).toUpperCase() || "GEN"

  const userProductCount = await this.countDocuments({ user: userId })
  const sequentialNumber = (userProductCount + 1).toString().padStart(4, "0")

  const productCode = productName
    .substring(0, 3)
    .toUpperCase()
    .replace(/[^A-Z]/g, "")

  return `${categoryCode}-${productCode}-${sequentialNumber}`
}

const generateSKU = async (userId, productName, categoryId) => {
  return await Product.generateSKU(userId, productName, categoryId)
}

const Product = mongoose.model("Product", productSchema)
export default Product
