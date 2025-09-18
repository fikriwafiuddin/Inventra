import analysisService from "../services/analysis-service.js"

const sales = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.query

    const salesData = await analysisService.sales(request, user)

    res.status(200).json({
      message: "Sales data retrieved successfully",
      data: { salesData },
    })
  } catch (error) {
    next(error)
  }
}

const purchases = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.query

    const purchasesData = await analysisService.purchases(request, user)
    console.log(purchasesData)

    res.status(200).json({
      message: "Purchases data retrieved successfully",
      data: { purchasesData },
    })
  } catch (error) {
    next(error)
  }
}

const analysisController = {
  sales,
  purchases,
}
export default analysisController
