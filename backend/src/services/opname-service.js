import mongoose from "mongoose"
import ResponseError from "../error/error-response.js"
import Opname from "../models/opname-model.js"
import opnameValidation from "../validations/opname-validation.js"
import validation from "../validations/validation.js"
import Product from "../models/product-model.js"
import stockMovementService from "./stockMovement-service.js"

const add = async (request, user) => {
  const { name } = validation(opnameValidation.add, request)

  const opnameIsExist = await Opname.findOne({ user, name })
  if (opnameIsExist) {
    throw new ResponseError("Name is already exist", 404)
  }

  const opname = await Opname.create({ user, name, startDate: new Date() })

  return opname
}

const getAll = async (request, user) => {
  const { start, end, status } = validation(opnameValidation.getAll, request)
  const filter = {
    user,
    startDate: {
      $gte: start,
      $lte: end,
    },
  }

  if (status.trim() && status.toLowerCase() !== "all") {
    filter.status = status
  }

  const opnames = await Opname.find(filter)

  return opnames
}

const detail = async (id, user) => {
  const opname = await Opname.findOne({ user, _id: id })
  if (!opname) {
    throw new ResponseError("Opname not found", 404)
  }

  return opname
}

const update = async (request, user) => {
  const { id, items, status } = validation(opnameValidation.update, request)

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const opname = await Opname.findOne({ user, _id: id }).session(session)
    if (!opname) {
      throw new ResponseError("Stock opname session not found", 404)
    }

    if (opname.status === "completed") {
      throw new ResponseError("The stocktaking session is complete", 400)
    }

    const updatedItems = [...opname.items]
    let totalDifference = opname.totalDifference

    for (const item of items) {
      const existingItemIndex = updatedItems.findIndex(
        (i) => i.id.toString() === item.id
      )

      if (existingItemIndex > -1) {
        const existingItem = updatedItems[existingItemIndex]
        const difference = item.physicalStock - existingItem.systemStock
        totalDifference +=
          difference - (existingItem.physicalStock - existingItem.systemStock)

        updatedItems[existingItemIndex].physicalStock = item.physicalStock
      } else {
        const product = await Product.findOne({ _id: item.id, user }).session(
          session
        )
        if (!product) {
          throw new ResponseError(`Product with ID ${item.id} not found`)
        }

        const newOpnameItem = {
          id: product._id,
          sku: product.sku,
          name: product.name,
          price: product.price,
          systemStock: product.stock,
          physicalStock: item.physicalStock,
        }

        const difference =
          newOpnameItem.physicalStock - newOpnameItem.systemStock
        totalDifference += difference

        updatedItems.push(newOpnameItem)
      }
    }

    opname.items = updatedItems
    opname.totalDifference = totalDifference

    if (status === "completed") {
      opname.status = "completed"
      opname.endDate = new Date()

      for (const item of opname.items) {
        const product = await Product.findById(item.id).session(session)
        if (product) {
          product.stock = item.physicalStock
          await product.save({ session })
        }

        await stockMovementService.add({
          session,
          user,
          product,
          qtyChange: item.physicalStock,
          movementType: "opname",
          sourceId: opname._id,
          reason: "Stock opname adjustment",
        })
      }
    }

    await opname.save({ session })

    await session.commitTransaction()
    session.endSession()

    return opname
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

const opnameService = {
  add,
  getAll,
  detail,
  update,
}
export default opnameService
