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

const adjustmentController = {
  add,
}
export default adjustmentController
