import statisticService from "../services/statistic-service.js"

const product = async (req, res, next) => {
  try {
    const user = req.user
    const statistic = await statisticService.product(user)

    return res.status(200).json({
      message: "Product statistic retrieved successfully",
      body: { statistic },
    })
  } catch (error) {
    next(error)
  }
}

const supplier = async (req, res, next) => {
  try {
    const user = req.user
    const statistic = await statisticService.supplier(user)

    return res.status(200).json({
      message: "Supplier statistic retrived successfully",
      body: { statistic },
    })
  } catch (error) {
    next(error)
  }
}

const stockMovementSummary = async (req, res, next) => {
  try {
    const user = req.user

    const statistic = await statisticService.stockMovementSummary(user)

    return res.status(200).json({
      message: "Stock movement summary retrived successfully",
      body: { statistic },
    })
  } catch (error) {
    next(error)
  }
}

const stockSummary = async (req, res, next) => {
  try {
    const user = req.user

    const data = await statisticService.stockSummary(user)

    return res.status(200).json({
      message: "Stock summary retrieved successfully",
      body: { ...data },
    })
  } catch (error) {
    next(error)
  }
}

const dashboard = async (req, res, next) => {
  try {
    const user = req.user

    const data = await statisticService.dashboard(user)

    return res.status(200).json({
      message: "Dashboard data retrieved successfully",
      body: { ...data },
    })
  } catch (error) {
    next(error)
  }
}

const weeklyIncomeInMonth = async (req, res, next) => {
  try {
    const user = req.user

    const weeklyIncomeInMonth = await statisticService.weeklyIncomeInMonth(user)

    return res.status(200).json({
      message: "Weekly income data retrieved successfully",
      body: { weeklyIncomeInMonth },
    })
  } catch (error) {
    next(error)
  }
}

const statisticController = {
  product,
  supplier,
  stockMovementSummary,
  dashboard,
  stockSummary,
  weeklyIncomeInMonth,
}
export default statisticController
