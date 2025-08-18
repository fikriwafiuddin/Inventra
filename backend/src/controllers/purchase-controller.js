import purchaseService from "../services/purchase-service.js"

const add = async (req, res, next) => {
  try {
    const request = req.body
    const user = req.user

    const purchase = await purchaseService.add(request, user)

    return res.status(201).json({
      message: "Purchase added successfully",
      body: { purchase },
    })
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const user = req.user

    const purchases = await purchaseService.getAll(user)

    return res.status(200).json({
      message: "Purchases retrieved successfully",
      body: { purchases },
    })
  } catch (error) {
    next(error)
  }
}

const purchaseController = {
  add,
  getAll,
}
export default purchaseController
