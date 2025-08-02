import categoryService from "../services/category-service.js"

const add = async (req, res, next) => {
  try {
    const user = req.user
    const category = await categoryService.add(req.body, user)

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
    const deletedCategory = await categoryService.remove(id)

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

    const updatedCategory = await categoryService.update({ name, id })
    return res.status(200).json({
      message: "Category updated successfully",
      body: { updatedCategory },
    })
  } catch (error) {
    next(error)
  }
}

const categoryController = {
  add,
  getAll,
  remove,
  update,
}
export default categoryController
