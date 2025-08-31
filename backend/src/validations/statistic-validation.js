import { z } from "zod"

const stockAlert = z.object({
  page: z.preprocess(
    (val) => Number(val),
    z.number("Page must be a number").positive("Page must be a positive number")
  ),
  limit: z.preprocess(
    (val) => Number(val),
    z
      .number("Limit must be a number")
      .positive("Limit must be a positive number")
  ),
})

const statisticValidation = {
  stockAlert,
}
export default statisticValidation
