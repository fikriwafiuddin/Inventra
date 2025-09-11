import Product from "../models/product-model.js"
import Repository from "./Repository.js"

class ProductRepository extends Repository {
  constructor() {
    super(Product)
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
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { sku: { $regex: searchTerm, $options: "i" } },
      ],
    }

    return this.find(filter, options)
  }
}

export default ProductRepository
