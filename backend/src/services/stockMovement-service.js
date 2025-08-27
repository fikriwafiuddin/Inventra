import StockMovement from "../models/stockMovement-model.js"

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

const stockMovementService = {
  add,
}
export default stockMovementService
