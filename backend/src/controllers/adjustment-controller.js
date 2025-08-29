import adjustmentService from "../services/adjustment-service.js"

const add = async (req, res, next) => {
  try {
    const request = req.body
    const user = req.user

    const adjustment = adjustmentService.add(request, user)

    return res.status(201).json({
      message: "Adjustment stock added successfully",
      body: { adjustment },
    })
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const user = req.user

    const adjustments = await adjustmentService.getAll(user)

    return res.status(200).json({
      message: "Adjustment stock retrieved successfully",
      body: { adjustments },
    })
  } catch (error) {
    next(error)
  }
}

const adjustmentController = {
  add,
  getAll,
}
export default adjustmentController
