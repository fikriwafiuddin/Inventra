import customerReturnService from "../services/customerReturn-service.js"

const add = async (req, res, next) => {
  try {
    const request = req.body
    const user = req.user

    const customerReturn = await customerReturnService.add(request, user)

    return res.status(201).json({
      message: "Customer return added successfully",
      body: { customerReturn },
    })
  } catch (error) {
    next(error)
  }
}

const customerReturnController = {
  add,
}
export default customerReturnController
