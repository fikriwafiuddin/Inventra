import StockMovement from "../models/stockMovement-model.js"
import stockMovementValidation from "../validations/stockMovement-validation.js"
import validation from "../validations/validation.js"

const add = async ({
  session,
  user,
  product,
  qtyChange,
  movementType,
  sourceId,
  reason,
}) => {
  const initialStock = product.stock
  const finalStock = initialStock + qtyChange

  const movement = new StockMovement({
    user: String(user),
    product: {
      id: product._id,
      sku: product.sku,
      name: product.name,
    },
    movementType,
    sourceId: String(sourceId),
    initialStock,
    finalStock,
    reason,
    timestamp: new Date(),
  })

  await movement.save({ session })
}

const getAll = async (request, user) => {
  const { start, end, type } = validation(
    stockMovementValidation.getAll,
    request
  )
  const filter = {
    user,
    timestamp: {
      $gte: start,
      $lte: end,
    },
  }

  if (type.trim() && type.toLowerCase().trim() !== "all") {
    filter.movementType = type
  }

  const stockMovements = await StockMovement.find(filter).sort({
    timestamp: -1,
  })

  return stockMovements
}

const stockMovementService = {
  add,
  getAll,
}
export default stockMovementService
