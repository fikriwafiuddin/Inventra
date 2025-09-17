import ResponseError from "../error/error-response.js"
import Category from "../models/category-model.js"
import Product from "../models/product-model.js"
import cloudinary from "../utils/clodinary.js"
import logger from "../utils/logger.js"
import productValidation from "../validations/product-validation.js"
import validation from "../validations/validation.js"

const add = async (request, user) => {
  const data = validation(productValidation.add, request)

  const category = await Category.findOne({ user, _id: data.category })
  if (!category) {
    throw new ResponseError("Category not found")
  }

  const product = await Product.findOne({
    user,
    name: data.name,
  })
  if (product) {
    throw new ResponseError("Product with this name already exists", 400, {
      name: ["Product with this name already exists"],
    })
  }

  const newProduct = new Product({
    ...data,
    user,
  })
  await newProduct.save()
  return newProduct
}

const getAll = async (request, user) => {
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

  const totalProducts = await Product.countDocuments(filter)
  const totalPages = Math.ceil(totalProducts / limit)
  const skip = (page - 1) * limit

  const products = await Product.find(filter)
    .populate("category")
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 })

  return { totalProducts, totalPages, currentPage: page, products, limit }
}

const remove = async (id, user) => {
  const deletedProduct = await Product.findOneAndDelete({ _id: id, user })
  if (!deletedProduct) {
    throw new ResponseError("Product not found", 404, {
      id: ["Product not found"],
    })
  }

  await cloudinary.uploader.destroy(
    deletedProduct.image.cloudinaryId,
    (error) => {
      if (error) {
        logger.error(
          `Failed to delete image from Cloudinary: ${error.message}, image: ${deletedProduct.image.url}`
        )
      }
    }
  )

  return deletedProduct
}

const detail = async (sku, user) => {
  const product = await Product.findOne({ sku, user }).populate("category")
  if (!product) {
    throw new ResponseError("Product not found", 404)
  }

  return product
}

const update = async (request, user) => {
  const data = validation(productValidation.update, request)

  const existingProductName = await Product.find({ user, name: data.name })
  if (existingProductName.length > 1) {
    throw new ResponseError("Name already exists", 400, {
      name: ["Name already exists"],
    })
  }

  const product = await Product.findOne({ _id: data.id, user })

  if (!product) {
    throw new ResponseError("Product not found", 404)
  }

  if (data.image) {
    await cloudinary.uploader.destroy(product.image.cloudinaryId, (error) => {
      if (error) {
        logger.error(
          `Failed to delete image from Cloudinary: ${error.message}, image: ${data.image.url}`
        )
      }
    })
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: data.id, user },
    data,
    { new: true }
  )
  return updatedProduct
}

const search = async (request, user) => {
  const { query, limit } = validation(productValidation.search, request)

  const products = await Product.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { sku: { $regex: query, $options: "i" } },
    ],
    user,
  }).limit(limit)

  return products
}

const productService = {
  add,
  getAll,
  remove,
  detail,
  update,
  search,
}
export default productService
