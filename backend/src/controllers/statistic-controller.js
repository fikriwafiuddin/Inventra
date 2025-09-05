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

const latestOrders = async (req, res, next) => {
  try {
    const user = req.user

    const latestOrders = await statisticService.latestOrders(user)

    return res.status(200).json({
      message: "Latest orders retrieved successfully",
      body: { latestOrders },
    })
  } catch (error) {
    next(error)
  }
}

const topProducts = async (req, res, next) => {
  try {
    const user = req.user

    const topProducts = await statisticService.topProducts(user)

    return res.status(200).json({
      message: "Top products retrieved successfully",
      body: { topProducts },
    })
  } catch (error) {
    next(error)
  }
}

const bottomProducts = async (req, res, next) => {
  try {
    const user = req.user

    const bottomProducts = await statisticService.bottomProducts(user)

    return res.status(200).json({
      message: "Bottom products retrieved successfully",
      body: { bottomProducts },
    })
  } catch (error) {
    next(error)
  }
}

const stockAlert = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.query

    const data = await statisticService.stockAlert(request, user)

    return res.status(200).json({
      message: "Stock alert retrieved successfully",
      body: { ...data },
    })
  } catch (error) {
    next(error)
  }
}

const latestStockMovements = async (req, res, next) => {
  try {
    const user = req.user

    const latestStockMovements = await statisticService.latestStockMovements(
      user
    )

    return res.status(200).json({
      message: "Latest stock movements retrieved successfully",
      body: { latestStockMovements },
    })
  } catch (error) {
    next(error)
  }
}

const statisticController = {
  product,
  supplier,
  stockMovementSummary,
  latestStockMovements,
  dashboard,
  stockSummary,
  weeklyIncomeInMonth,
  latestOrders,
  topProducts,
  stockAlert,
  bottomProducts,
}
export default statisticController
