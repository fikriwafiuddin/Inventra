import ResponseError from "../error/error-response.js"
import CategoryRepository from "../repositories/CategoryRepository.js"
import categoryValidation from "../validations/category-validation.js"
import validation from "../validations/validation.js"
import Service from "./Service.js"

class CategoryService extends Service {
  constructor() {
    super()
    this.categoryRepository = new CategoryRepository()
  }

  async create(request, user) {
    console.log(request)
    const { name } = validation(categoryValidation.add, request)
    const categoryIsExist = await this.categoryRepository.findOne({
      name,
      user,
    })
    if (categoryIsExist) {
      throw new ResponseError("Category already exists", 400)
    }

    const category = await this.categoryRepository.create({ name, user })
    return category
  }

  async getAll(user) {
    const categories = await this.categoryRepository.find(
      { user },
      { projection: { name: 1 } }
    )
    return categories
  }

  async remove(id, user) {
    const category = await this.categoryRepository.remove({ _id: id, user })
    if (!category) {
      throw new ResponseError("Category not found")
    }

    return category
  }

  async update(request, user) {
    const data = validation(categoryValidation.update, request)

    const existingCategoryName = await this.categoryRepository.find({
      name: data.name,
      user,
    })
    if (existingCategoryName > 1) {
      throw new ResponseError("Category name already exists", 400)
    }

    const category = await this.categoryRepository.update(
      { _id: data.id, user },
      data
    )
    if (!category) {
      throw new ResponseError("Category not found", 404)
    }

    return category
  }
}

export default CategoryService
