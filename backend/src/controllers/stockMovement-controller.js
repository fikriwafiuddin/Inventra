import stockMovementService from "../services/stockMovement-service.js"

const getAll = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.query

    const stockMovements = await stockMovementService.getAll(request, user)

    return res.status(200).json({
      message: "Stock movements retrieved successfully",
      body: { stockMovements },
    })
  } catch (error) {
    next(error)
  }
}

const stockMovementController = {
  getAll,
}
export default stockMovementController
