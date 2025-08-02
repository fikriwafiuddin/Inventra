import ResponseError from "../error/error-response.js"
import Category from "../models/category-model.js"
import categoryValidation from "../validations/category-validation.js"
import validation from "../validations/validation.js"

const add = async (request, user) => {
  const { name } = validation(categoryValidation.add, request)

  const category = await Category.findOne({ name, user })
  if (category) {
    throw new ResponseError("Category already exists", 400)
  }

  const newCategory = new Category({
    user,
    name,
  })
  const savedCategory = await newCategory.save()
  return savedCategory
}

const getAll = async (user) => {
  const categories = await Category.find({ user }).sort({ createdAt: -1 })
  return categories
}

const remove = async (id) => {
  const deletedCategory = await Category.findByIdAndDelete(id)

  if (!deletedCategory) {
    throw new ResponseError("Category not found", 404)
  }
  return deletedCategory
}

const update = async (request) => {
  const { name, id } = validation(categoryValidation.update, request)

  const existingCategory = await Category.findOne({ name })
  if (existingCategory) {
    throw new ResponseError("Category with this name already exists", 400)
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  )
  if (!updatedCategory) {
    throw new ResponseError("Category not found", 404)
  }
  return updatedCategory
}

const categoryService = {
  add,
  getAll,
  remove,
  update,
}
export default categoryService
