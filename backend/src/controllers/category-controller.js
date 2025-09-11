import CategoryService from "../services/CategoryService.js"

const categoryService = new CategoryService()

const create = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.body
    console.log(request)
    const category = await categoryService.create(request, user)

    return res.status(201).json({
      message: "Category added successfully",
      body: { category },
    })
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const user = req.user
    const categories = await categoryService.getAll(user)

    return res.status(200).json({
      message: "Categories fetched successfully",
      body: { categories },
    })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = req.user
    const deletedCategory = await categoryService.remove(id, user)

    return res.status(200).json({
      message: "Category deleted successfully",
      body: { deletedCategory },
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const { name } = req.body
    const { id } = req.params
    const request = { id, name }
    const user = req.user

    const updatedCategory = await categoryService.update(request, user)
    return res.status(200).json({
      message: "Category updated successfully",
      body: { updatedCategory },
    })
  } catch (error) {
    next(error)
  }
}

const categoryController = {
  create,
  getAll,
  remove,
  update,
}
export default categoryController
