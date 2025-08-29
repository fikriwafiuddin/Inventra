import supplierService from "../services/supplier-service.js"

const add = async (req, res, next) => {
  try {
    const request = req.body
    const user = req.user
    console.log(request)

    const newSupplier = await supplierService.add(request, user)

    return res.status(201).json({
      message: "Supplier added successfully",
      body: { newSupplier },
    })
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.query

    const data = await supplierService.getAll(request, user)
    return res.status(200).json({
      message: "Supplier retrieved successfully",
      body: { ...data },
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const request = req.body
    const user = req.user
    const id = req.params.id

    const updatedSupplier = await supplierService.update(
      { id, ...request },
      user
    )
    return res.status(200).json({
      message: "Supplier updated successfully",
      body: { updatedSupplier },
    })
  } catch (error) {
    next(error)
  }
}

const updateStatus = async (req, res, next) => {
  try {
    const id = req.params.id
    const status = req.body.status
    const user = req.user

    const updatedSupplier = await supplierService.updateStatus(
      { id, status },
      user
    )

    return res.status(200).json({
      message: "Supplier status updated successfully",
      body: { updatedSupplier },
    })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const id = req.params.id
    const user = req.user

    const deletedSupplier = await supplierService.remove(id, user)

    return res.status(200).json({
      message: "Supplier deleted successfully",
      body: { deletedSupplier },
    })
  } catch (error) {
    next(error)
  }
}

const search = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.query

    const suppliers = await supplierService.search(request, user)

    return res.status(200).json({
      message: "Supplier retrieved successfully",
      body: { suppliers },
    })
  } catch (error) {
    next(error)
  }
}

const supplierController = {
  add,
  getAll,
  update,
  updateStatus,
  remove,
  search,
}
export default supplierController
