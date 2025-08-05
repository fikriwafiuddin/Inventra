import productService from "../services/product-service.js"

const add = async (req, res, next) => {
  try {
    const image = req.file
    const user = req.user
    const request = req.body

    const newProduct = await productService.add(
      {
        ...request,
        image: { url: image?.secure_url, cloudinaryId: image?.public_id },
      },
      user
    )

    return res.status(201).json({
      message: "Product added successfully",
      body: { product: newProduct },
    })
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const user = req.user
    const products = await productService.getAll(user)

    return res
      .status(200)
      .json({ message: "Products retrieved successfully", body: { products } })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const id = req.params.id
    const user = req.user
    const deletedProduct = await productService.remove(id, user)

    return res.status(200).json({
      message: "Product deleted successfully",
      body: { product: deletedProduct },
    })
  } catch (error) {
    next(error)
  }
}

const detail = async (req, res, next) => {
  try {
    const sku = req.params.sku
    const user = req.user

    const product = await productService.detail(sku, user)
    return res.status(200).json({
      message: "Product details retrieved successfully",
      body: { product },
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const user = req.user
    const image = req.file
    const request = image
      ? {
          ...req.body,
          image: { url: image?.secure_url, cloudinaryId: image?.public_id },
        }
      : req.body

    const updatedProduct = await productService.update(request, user)
    return res.status(200).json({
      message: "Product updated successfully",
      body: { updatedProduct },
    })
  } catch (error) {
    next(error)
  }
}

const productController = {
  add,
  getAll,
  remove,
  detail,
  update,
}
export default productController
