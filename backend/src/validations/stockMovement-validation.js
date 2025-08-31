import { z } from "zod"

const getAll = z.object({
  start: z.preprocess(
    (val) => new Date(val),
    z.date("Start date must be a date")
  ),
  end: z.preprocess((val) => new Date(val), z.date("End date must be a date")),
  type: z.string("Type must be a string").optional(),
})

const stockMovementValidation = {
  getAll,
}

export default stockMovementValidation
