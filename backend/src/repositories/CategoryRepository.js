import Repository from "./Repository.js"
import Category from "../models/category-model.js"

class CategoryRepository extends Repository {
  constructor() {
    super(Category)
  }
}

export default CategoryRepository
