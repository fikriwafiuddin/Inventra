import opnameService from "../services/opname-service.js"

const add = async (req, res, next) => {
  try {
    const request = req.body
    const user = req.user

    const opname = await opnameService.add(request, user)

    return res.status(201).json({
      message: "Opname added successfully",
      body: { opname },
    })
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.query

    const opnames = await opnameService.getAll(request, user)

    return res.status(200).json({
      message: "Opnames retrieved successfully",
      body: { opnames },
    })
  } catch (error) {
    next(error)
  }
}

const detail = async (req, res, next) => {
  try {
    const id = req.params.id
    const user = req.user

    const opname = await opnameService.detail(id, user)

    return res.status(200).json({
      message: "Opname retrivied successfully",
      body: { opname },
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const request = req.body
    const user = req.user

    const updatedOpname = await opnameService.update(request, user)

    return res.status(201).json({
      message: "Session opname stock updated successfully",
      body: { updatedOpname },
    })
  } catch (error) {
    next(error)
  }
}

const opnameController = {
  add,
  getAll,
  detail,
  update,
}
export default opnameController
