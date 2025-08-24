import supplierReturnService from "../services/supplierReturn-service.js"

const add = async (req, res, next) => {
  try {
    const request = req.body
    const user = req.user

    const supplierReturn = await supplierReturnService.add(request, user)

    return res.status(201).json({
      message: "Supplier return successfully added",
      body: { supplierReturn },
    })
  } catch (error) {
    next(error)
  }
}

const supplierReturnController = {
  add,
}
export default supplierReturnController
