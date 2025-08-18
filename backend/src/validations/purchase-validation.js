import { z } from "zod"

const add = z.object({
  supplier: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Supplier is required" : "Invalid supplier",
    })
    .min(1, { error: "Supplier is required" })
    .length(24, { error: "Invalid supplier" }),
  fracture: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Fracture is required"
          : "fracture must be a string",
    })
    .min(1, { error: "Fracture is required" })
    .trim(),
  date: z.preprocess(
    (val) => new Date(val),
    z
      .date({
        error: "Date must be a date",
      })
      .min(1, { error: "Date is required" })
  ),
  items: z
    .array(
      z.object({
        product: z
          .string({
            error: (issue) =>
              issue.input === undefined
                ? "Product is required"
                : "Invalid product",
          })
          .length(24, { error: "Invalid product" }),
        quantity: z.preprocess(
          (val) => Number(val),
          z
            .int({
              error: (issue) =>
                issue.input === undefined
                  ? "Quantity is required"
                  : "Quantity must be a integer",
            })
            .positive({ error: "Quantity must be a positive number" })
        ),
        totalPrice: z.preprocess(
          (val) => Number(val),
          z
            .number({
              error: (issue) =>
                issue.input === undefined
                  ? "Total Price is required"
                  : "Total Price must be a number",
            })
            .positive({ error: "Total Price must be a positive number" })
        ),
      })
    )
    .min(1, "There must be at least 1 item")
    .refine((items) => {
      return items.every(
        (item) => item.product && item.quantity && item.totalPrice
      )
    }, "All items must be filled in completely"),
})

const purchaseValidation = {
  add,
}
export default purchaseValidation
