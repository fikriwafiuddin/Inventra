import analysisService from "../services/analysis-validation.js"

const sales = async (req, res, next) => {
  try {
    const salesData = await analysisService.sales(req, user)

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
