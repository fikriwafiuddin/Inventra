import ResponseError from "../error/error-response.js"
import Order from "../models/order-model.js"
import analysisValidation from "../validations/ananlysis-validation.js"
import validation from "../validations/validation.js"
import Purchase from "../models/purchase-model.js"

const sales = async (request, user) => {
  const { timePeriod } = validation(
    analysisValidation.analysisQuerySchema,
    request
  )

  const ranges = {
    "1d": 1,
    "7d": 7,
    "30d": 30,
    "90d": 90,
    "180d": 180,
    "365d": 365,
  }

  if (!ranges[timePeriod]) {
    throw new ResponseError(
      "Invalid range. Use one of: 1d, 7d, 30d, 90d, 180d, 365d"
    )
  }

  const now = new Date()
  const days = ranges[timePeriod]

  const startDate = new Date()
  startDate.setDate(now.getDate() - (days - 1))

  const data = await Order.aggregate([
    {
      $match: {
        user,
        date: { $gte: startDate, $lte: now },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        revenue: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ])

  return data.map((d) => ({
    date: d._id,
    revenue: d.revenue,
  }))
}

const purchases = async (request, user) => {
  const { timePeriod } = validation(
    analysisValidation.analysisQuerySchema,
    request
  )

  const ranges = {
    "1d": 1,
    "7d": 7,
    "30d": 30,
    "90d": 90,
    "180d": 180,
    "365d": 365,
  }

  if (!ranges[timePeriod]) {
    throw new ResponseError(
      "Invalid range. Use one of: 1d, 7d, 30d, 90d, 180d, 365d"
    )
  }

  const now = new Date()
  const days = ranges[timePeriod]

  const startDate = new Date()
  startDate.setDate(now.getDate() - (days - 1))

  const data = await Purchase.aggregate([
    {
      $match: {
        user,
        date: { $gte: startDate, $lte: now },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        amount: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ])

  return data.map((d) => ({
    date: d._id,
    amount: d.amount,
  }))
}

const analysisService = {
  sales,
  purchases,
}
export default analysisService
