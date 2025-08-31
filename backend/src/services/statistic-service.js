import Order from "../models/order-model.js"
import Product from "../models/product-model.js"
import StockMovement from "../models/stockMovement-model.js"
import Supplier from "../models/supplier-model.js"
import statisticValidation from "../validations/statistic-validation.js"
import validation from "../validations/validation.js"

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

const dashboard = async (user) => {
  const revenue = await Order.aggregate([
    {
      $match: { user },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$amount" },
      },
    },
  ])
  const totalProducts = await Product.countDocuments({ user })
  const totalOrders = await Order.countDocuments({ user })
  const outOfStock = await Product.countDocuments({ user, stock: 0 })

  return {
    revenue: revenue[0]?.totalRevenue || 0,
    totalProducts,
    totalOrders,
    outOfStock,
  }
}

const weeklyIncomeInMonth = async (user) => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0, 23, 59, 59, 999)

  const result = await Order.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate },
        user,
      },
    },
    {
      $project: {
        amount: 1,
        weekOfMonth: {
          $ceil: {
            $divide: [{ $dayOfMonth: "$date" }, 7],
          },
        },
      },
    },
    {
      $group: {
        _id: "$weekOfMonth",
        revenue: { $sum: "$amount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ])

  return result.map((item) => ({
    week: item._id,
    revenue: item.revenue,
  }))
}

const latestOrders = async (user, limit = 6) => {
  const orders = await Order.find({ user }).sort({ createdAt: -1 }).limit(limit)
  return orders
}

const topProducts = async (user, limit = 5) => {
  const products = await Product.find({ user }).sort({ sold: -1 }).limit(limit)
  return products
}

const stockAlert = async (request, user) => {
  const { page, limit } = validation(statisticValidation.stockAlert, request)
  const filter = { $expr: { $lt: ["$stock", "$minStock"] } }

  const totalProducts = await Product.countDocuments(filter)

  const totalPages = Math.ceil(totalProducts / limit)

  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("category")

  return { totalPages, currentPage: page, products, limit, totalProducts }
}

const statisticService = {
  product,
  supplier,
  stockMovementSummary,
  stockSummary,
  dashboard,
  weeklyIncomeInMonth,
  latestOrders,
  topProducts,
  stockAlert,
}
export default statisticService
