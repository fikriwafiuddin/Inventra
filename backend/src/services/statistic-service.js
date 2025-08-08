import Product from "../models/product-model.js"
import Supplier from "../models/supplier-model.js"

const product = async (user) => {
  const totalProduct = await Product.countDocuments({ user })
  const outOfStock = await Product.countDocuments({ stock: 0 })

  return { totalProduct, outOfStock }
}

const supplier = async (user) => {
  const totalSupplier = await Supplier.countDocuments({ user })
  const totalActive = await Supplier.countDocuments({ user, status: "active" })

  return {
    totalSupplier,
    totalActive,
    totalInactive: totalSupplier - totalActive,
  }
}

const statisticService = {
  product,
  supplier,
}
export default statisticService
