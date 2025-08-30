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

const getAll = async (req, res, next) => {
  try {
    const request = req.query
    const user = req.user

    const supplierReturns = await supplierReturnService.getAll(request, user)

    return res.status(200).json({
      message: "Supplier returns retrieved successfully",
      body: { supplierReturns },
    })
  } catch (error) {
    next(error)
  }
}

const supplierReturnController = {
  add,
  getAll,
}
export default supplierReturnController
