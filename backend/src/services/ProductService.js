import ResponseError from "../error/error-response.js"
import CategoryRepository from "../repositories/CategoryRepository.js"
import ProductRepository from "../repositories/ProductRepository.js"
import productValidation from "../validations/product-validation.js"
import validation from "../validations/validation.js"
import Service from "./Service.js"

class ProductService extends Service {
  constructor() {
    super()
    this.productRepository = new ProductRepository()
    this.categoryRepository = new CategoryRepository()
  }

  async getAll(request, user) {
    const { limit, page, category, search } = validation(
      productValidation.getAll,
      request
    )

    const filter = { user }
    if (category && category !== "all") {
      filter.category = category
    }
    if (search && search.trim() !== "") {
      filter.name = { $regex: search, $options: "i" }
    }

    const totalProducts = await this.productRepository.count(filter)
    const totalPages = Math.ceil(totalProducts / limit)
    const skip = (page - 1) * limit

    const options = {
      populate: { path: "category", select: "name" },
      limit,
      skip,
      sort: { createdAt: -1 },
      projection: { user: 0, description: 0, createdAt: 0, updatedAt: 0 },
    }

    const products = await this.productRepository.find(filter, options)

    return { totalProducts, totalPages, currentPage: page, products, limit }
  }

  async create(request, user) {
    const data = validation(productValidation.add, request)

    const productIsExist = await this.productRepository.findOne({
      name: data.name,
      user,
    })
    if (productIsExist) {
      throw new ResponseError("Product with this name already exists", 400, {
        name: ["Product with this name already exists"],
      })
    }

    const category = await this.categoryRepository.findOne({
      _id: data.category,
      user,
    })
    if (!category) {
      throw new ResponseError("Category not found", 404, {
        category: ["category not found"],
      })
    }

    return await this.productRepository.create({ ...data, user })
  }

  async remove(id, user) {
    const deletedProduct = await this.productRepository.remove({
      _id: id,
      user,
    })
    if (!deletedProduct) {
      throw new ResponseError("Product not found", 404, {
        id: ["Product not found"],
      })
    }

    await this.removeImg(deletedProduct.image)

    return deletedProduct
  }

  async update(request, user) {
    const data = validation(productValidation.update, request)

    const existingProductName = await this.productRepository.find({
      user,
      name: data.name,
    })
    if (existingProductName.length > 1) {
      throw new ResponseError("Name already exists", 400, {
        name: ["Name already exists"],
      })
    }
    const product = await this.productRepository.findOne({ _id: data.id, user })
    if (!product) {
      throw new ResponseError("Product not found", 404)
    }

    if (data.image) {
      await this.removeImg(product.image)
      product.image = data.image
    }

    product.name = data.name
    product.category = data.category
    product.price = data.price
    product.description = data.description
    product.minStock = data.minStock

    return await product.save()
  }

  async detail(sku, user) {
    const product = await this.productRepository.findOne({ sku, user })
    if (!product) {
      throw new ResponseError("Product not found", 404)
    }

    return product
  }

  async search(request, user) {
    const { query, limit } = validation(productValidation.search, request)

    const products = await this.productRepository.search(user, query, {
      limit,
      projection: { name: 1, sku: 1 },
    })

    return products
  }
}

export default ProductService
