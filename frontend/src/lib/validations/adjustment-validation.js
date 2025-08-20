import { z } from "zod"

const add = z.object({
  quantity: z.preprocess(
    (val) => Number(val),
    z.number({
      error: (issue) =>
        issue.input === undefined ? "Quantity is required" : "Invalid quantity",
    })
  ),
  reason: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Reason is required" : "Invalid reason",
    })
    .min(1, { error: "Reason is required" })
    .max(10, { error: "Reason must be at most 10 characters" }),
  product: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Product is required" : "Invalid product",
    })
    .length(24, { error: "Product must be 24 characters" }),
})

const adjustmentValidation = {
  add,
}
export default adjustmentValidation
