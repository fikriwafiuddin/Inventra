import ResponseError from "../error/error-response.js"
import Product from "../models/product-model.js"
import cloudinary from "../utils/clodinary.js"
import logger from "../utils/logger.js"
import productValidation from "../validations/product-validation.js"
import validation from "../validations/validation.js"

const add = async (request, user) => {
  const data = validation(productValidation.add, request)

  const product = await Product.findOne({
    $and: [
      {
        $or: [{ name: data.name }, { sku: data.sku }],
      },
      { user: user._id },
    ],
  })
  if (product) {
    if (product.name === data.name) {
      throw new ResponseError("Product with this name already exists", 400, {
        name: ["Product with this name already exists"],
      })
    }
    if (product.sku === data.sku) {
      throw new ResponseError("Product with this SKU already exists", 400, {
        sku: ["Product with this SKU already exists"],
      })
    }
  }

  const newProduct = new Product({
    ...data,
    user,
  })
  await newProduct.save()
  return newProduct
}

const getAll = async (user) => {
  const products = await Product.find({ user }).populate("category")
  return products
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

  const existingProductSku = await Product.find({ user, sku: data.sku })
  if (existingProductSku.length > 1) {
    throw new ResponseError("SKU already exists", 400, {
      sku: ["SKU already exists"],
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

const productService = {
  add,
  getAll,
  remove,
  detail,
  update,
}
export default productService
