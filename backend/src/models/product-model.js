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
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    sku: {
      type: String,
      uppercase: true,
      match: /^[A-Z0-9\-]+$/,
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
    lastRestock: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "discontinued"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
)

// ✅ COMPOUND INDEX UNTUK QUERY PERFORMANCE
productSchema.index({ user: 1, sku: 1 }, { unique: true }) // SKU unique per user
productSchema.index({ user: 1, name: 1 }) // Search by name
productSchema.index({ user: 1, category: 1 }) // Filter by category
productSchema.index({ user: 1, stock: 1 }) // Low stock alert
productSchema.index({ user: 1, price: 1 }) // Price range queries
productSchema.index({ user: 1, status: 1 }) // Status filtering
productSchema.index({ user: 1, sold: -1 }) // Best selling products
productSchema.index({ user: 1, createdAt: -1 }) // Newest products

// ✅ PRE-SAVE MIDDLEWARE UNTUK AUTO-SKU
productSchema.pre("save", async function (next) {
  if (this.isNew && !this.sku) {
    this.sku = await generateSKU(this.user, this.name, this.category)
    console.log(this.sku)
  }

  // Auto-update lastRestock jika stock bertambah
  if (
    this.isModified("stock") &&
    this.stock > this.get("stock", null, { getters: false })
  ) {
    this.lastRestock = new Date()
  }

  next()
})

// ✅ STATIC METHOD UNTUK SKU GENERATION
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

// ✅ HELPER FUNCTION
const generateSKU = async (userId, productName, categoryId) => {
  return await Product.generateSKU(userId, productName, categoryId)
}

const Product = mongoose.model("Product", productSchema)
export default Product
