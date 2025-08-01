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

const categoryService = {
  add,
}
export default categoryService
