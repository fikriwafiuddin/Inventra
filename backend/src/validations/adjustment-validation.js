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
    .min(3, { error: "Reason must be at least 3 characters" })
    .max(10, { error: "Reason must be at most 10 characters" }),
  product: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Product ID is required"
          : "Invalid product ID",
    })
    .length(24, { error: "Product ID must be 24 characters" }),
})

const getAll = z.object({
  start: z.preprocess(
    (val) => new Date(val),
    z.date({
      error: (issue) =>
        issue.input === undefined
          ? "Start date is required"
          : "Start date must be a date",
    })
  ),
  end: z.preprocess(
    (val) => new Date(val),
    z.date({
      error: (issue) =>
        issue.input === undefined
          ? "End date is required"
          : "End date must be a date",
    })
  ),
})

const adjustmenValidation = {
  add,
  getAll,
}
export default adjustmenValidation
