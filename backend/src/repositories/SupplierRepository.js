import Supplier from "../models/supplier-model.js"
import Repository from "./Repository.js"

class SupplierRepository extends Repository {
  constructor() {
    super(Supplier)
  }

  async search(
    user,
    searchTerm,
    options = {
      populate: null,
      limit: null,
      skip: null,
      sort: null,
      projection: null,
      session: null,
    }
  ) {
    const filter = {
      user,
      name: { $regex: searchTerm, $options: "i" },
    }

    return this.find(filter, options)
  }
}

export default SupplierRepository
