import Product from "../models/product-model.js"

const product = async (user) => {
  const totalProduct = await Product.countDocuments({ user })
  const outOfStock = await Product.countDocuments({ stock: 0 })

  return { totalProduct, outOfStock }
}

const statisticService = {
  product,
}
export default statisticService
