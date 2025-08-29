import ResponseError from "../error/error-response.js"
import Supplier from "../models/supplier-model.js"
import supplierValidation from "../validations/supplier-validation.js"
import validation from "../validations/validation.js"

const add = async (request, user) => {
  const data = validation(supplierValidation.add, request)

  const supplier = await Supplier.findOne({ user, name: data.name })
  if (supplier) {
    throw new ResponseError("Supplier with this name already exists", 400, {
      name: ["Supplier with this name already exists"],
    })
  }

  const newProduct = await Supplier.create({ user, ...data })
  return newProduct
}

const getAll = async (request, user) => {
  const { page, limit, status, search } = validation(
    supplierValidation.getAll,
    request
  )

  const query = { user }
  if (status && status !== "all") query.status = status
  if (search) query.name = { $regex: new RegExp(search, "i") }

  const totalSuppliers = await Supplier.countDocuments(query)
  const totalPages = Math.ceil(totalSuppliers / limit) || 1

  const suppliers = await Supplier.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
  return { suppliers, currentPage: page, limit, totalPages, totalSuppliers }
}

const update = async (request, user) => {
  const { id, ...data } = validation(supplierValidation.update, request)

  const existingSupplierName = await Supplier.findOne({ user, name: data.name })
  if (existingSupplierName && existingSupplierName._id.toString() !== id) {
    throw new ResponseError("Supplier with this name already exists", 400, {
      supplier: ["Supplier with this name already exists"],
    })
  }

  const updatedSupplier = await Supplier.findOneAndUpdate(
    { user, _id: id },
    data,
    { new: true }
  )

  return updatedSupplier
}

const updateStatus = async (request, user) => {
  const { id, status } = validation(supplierValidation.status, request)

  const supplier = await Supplier.findOne({ _id: id, user })
  if (!supplier) {
    throw new ResponseError("Supplier not found")
  }

  supplier.status = status
  const updatedSupplier = await supplier.save()

  return updatedSupplier
}

const remove = async (id, user) => {
  const deletedSupplier = await Supplier.findOneAndDelete({ _id: id, user })
  if (!deletedSupplier) {
    throw new ResponseError("Supplier not found", 404)
  }

  return deletedSupplier
}

const search = async (request, user) => {
  const { query, limit } = validation(supplierValidation.search, request)

  const regex = new RegExp(query, "i")

  const suppliers = await Supplier.find(
    { name: { $regex: regex }, user },
    { _id: 1, name: 1 }
  )
    .limit(limit)
    .exec()

  return suppliers
}

const supplierService = {
  add,
  getAll,
  update,
  updateStatus,
  remove,
  search,
}
export default supplierService
