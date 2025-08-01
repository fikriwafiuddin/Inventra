import categoryService from "../services/category-service.js"

const add = async (req, res, next) => {
  try {
    const user = req.user
    const category = await categoryService.add(req.body, user)

    return res.status(201).json({
      message: "Category added successfully",
      data: category,
    })
  } catch (error) {
    next(error)
  }
}

const categoryController = {
  add,
}
export default categoryController
