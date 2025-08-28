import Product from "../models/product-model.js"
import StockMovement from "../models/stockMovement-model.js"
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

const stockMovementSummary = async (user) => {
  const totalTransactions = await StockMovement.countDocuments({ user })

  const pipeline = [
    {
      $match: { user: userId },
    },
    {
      $project: {
        movementType: 1,
        diff: { $subtract: ["$finalStock", "$initialStock"] },
      },
    },
    {
      $group: {
        _id: null,
        stockIn: {
          $sum: {
            $cond: [{ $gt: ["$diff", 0] }, "$diff", 0],
          },
        },
        stockOut: {
          $sum: {
            $cond: [{ $lt: ["$diff", 0] }, { $abs: "$diff" }, 0],
          },
        },
      },
    },
  ]

  const movements = await StockMovement.aggregate(pipeline)

  return {
    totalTransactions,
    stockIn: movements[0] ? movements[0].stockIn : 0,
    stockOut: movements[0] ? movements[0].stockOut : 0,
  }
}

const statisticService = {
  product,
  supplier,
  stockMovementSummary,
}
export default statisticService
