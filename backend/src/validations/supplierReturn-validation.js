import { z } from "zod"

const add = z.object({
  invoice: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Invoice is required"
          : "Invoice must be a string",
    })
    .min(1, { error: "Invoice is required" }),
  items: z
    .array(
      z.object({
        id: z
          .string({
            error: (issue) =>
              issue.input === undefined
                ? "Product ID is required"
                : "Product ID must be a string",
          })
          .length(24, { error: "Product ID must 24 characters" }),
        condition: z
          .string({
            error: (issue) =>
              issue.input === undefined
                ? "Condition is required"
                : "Condition must be a string",
          })
          .min(1, { error: "Condition is required" })
          .max(10, { error: "Condition must be at most 10 characters" }),
        quantity: z.preprocess(
          (val) => Number(val),
          z
            .number({
              error: (issue) =>
                issue.input === undefined
                  ? "Quantity is required"
                  : "Quantity must be a number",
            })
            .positive({ error: "Quantity must be a positive number" })
        ),
      })
    )
    .min(1, "There must be at least 1 item")
    .refine((items) => {
      return items.every((item) => item.id && item.condition && item.quantity)
    }, "All items must be filled in completely"),
  notes: z.string({ error: "Notes must be a string" }).optional(),
  date: z.preprocess(
    (val) => new Date(val),
    z.date({ error: "Date must be a date" })
  ),
})

const getAll = z.object({
  start: z.preprocess(
    (val) => new Date(val),
    z.date("Start date must be a date")
  ),
  end: z.preprocess((val) => new Date(val), z.date("End date must be a date")),
})

const supplierReturnValidation = {
  add,
  getAll,
}
export default supplierReturnValidation
