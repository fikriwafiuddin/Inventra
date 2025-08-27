import stockMovementService from "../services/stockMovement-service"

const getAll = async (req, res, next) => {
  try {
    const user = req.user

    const stockMovements = await stockMovementService.getAll(user)

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
