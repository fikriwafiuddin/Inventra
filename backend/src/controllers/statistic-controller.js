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

const statisticController = {
  product,
  supplier,
}
export default statisticController
