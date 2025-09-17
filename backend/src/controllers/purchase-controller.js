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
    const request = req.query

    const purchases = await purchaseService.getAll(request, user)

    return res.status(200).json({
      message: "Purchases retrieved successfully",
      body: { purchases },
    })
  } catch (error) {
    next(error)
  }
}

const detail = async (req, res, next) => {
  try {
    const { invoice } = req.params
    const user = req.user

    const purchase = await purchaseService.detail(invoice, user)

    return res.status(200).json({
      message: "Purchase details retrieved successfully",
      body: { purchase },
    })
  } catch (error) {
    next(error)
  }
}

const purchaseController = {
  add,
  getAll,
  detail,
}
export default purchaseController
