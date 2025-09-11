import SupplierRepository from "../repositories/SupplierRepository.js"
import Service from "./Service.js"
import validation from "../validations/validation.js"
import supplierValidation from "../validations/supplier-validation.js"
import ResponseError from "../error/error-response.js"

class SupplierService extends Service {
  constructor() {
    super()
    this.supplierRepository = new SupplierRepository()
  }

  async getAll(request, user) {
    const { page, limit, status, search } = validation(
      supplierValidation.getAll,
      request
    )

    const filter = { user }
    if (status && status !== "all") filter.status = status
    if (search) filter.name = { $regex: new RegExp(search, "i") }

    const totalSuppliers = await this.supplierRepository.count(filter)
    const totalPages = Math.ceil(totalSuppliers / limit) || 1

    const suppliers = await this.supplierRepository.find(filter, {
      limit,
      skip: (page - 1) * limit,
    })

    return { suppliers, currentPage: page, limit, totalPages, totalSuppliers }
  }

  async create(request, user) {
    const data = validation(supplierValidation.create, request)

    const supplierIsExists = await this.supplierRepository.findOne({
      name: data.name,
      user,
    })
    if (supplierIsExists) {
      throw new ResponseError("Supplier with this name already exists", 400, {
        name: ["Supplier with this name already exists"],
      })
    }

    return await this.supplierRepository.create({ ...data, user })
  }

  async update(request, user) {
    const { id, ...data } = validation(supplierValidation.update, request)

    const existingSupplierName = await this.supplierRepository.find({
      name: data.name,
      user,
    })
    if (existingSupplierName.length > 1) {
      throw new ResponseError("Supplier with this name already exists", 400, {
        supplier: ["Supplier with this name already exists"],
      })
    }

    return await this.supplierRepository.update({ _id: id, user }, data)
  }

  async remove(id, user) {
    const deletedSupplier = await this.supplierRepository.remove({
      _id: id,
      user,
    })
    if (!deletedSupplier) {
      throw new ResponseError("Supplier not foudn", 404)
    }

    return deletedSupplier
  }

  async updateStatus(request, user) {
    const { id, status } = validation(supplierValidation.status, request)

    const updatedSupplier = await this.supplierRepository.update(
      { _id: id, user },
      { status }
    )
    if (!updatedSupplier) {
      throw new ResponseError("Supplier not found", 404)
    }

    return updatedSupplier
  }

  async search(request, user) {
    const { query, limit } = validation(supplierValidation.search, request)

    const suppliers = await this.supplierRepository.search(user, query, {
      projection: { _id: 1, name: 1 },
      limit,
    })

    return suppliers
  }
}

export default SupplierService
