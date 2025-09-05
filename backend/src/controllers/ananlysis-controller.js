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

const analysisController = {
  sales,
}
export default analysisController
