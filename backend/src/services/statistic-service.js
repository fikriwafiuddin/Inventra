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
      $match: { user },
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

const stockSummary = async (user) => {
  const totalProducts = await Product.countDocuments({ user })
  const outOfStock = await Product.countDocuments({ user, stock: 0 })

  const lowStockAgg = await Product.aggregate([
    {
      $match: {
        user,
        stock: { $gt: 0 },
      },
    },
    {
      $project: {
        stock: 1,
        minStock: 1,
        isLow: { $lt: ["$stock", "$minStock"] },
      },
    },
    { $match: { isLow: true } },
    { $count: "count" },
  ])

  const lowStock = lowStockAgg[0]?.count || 0

  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)

  const todayStockMovementCount = await StockMovement.countDocuments({
    user,
    timestamp: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  })

  return { totalProducts, outOfStock, lowStock, todayStockMovementCount }
}

const statisticService = {
  product,
  supplier,
  stockMovementSummary,
  stockSummary,
}
export default statisticService
