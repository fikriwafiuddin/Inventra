import { z } from "zod"

const add = z.object({
  date: z.preprocess(
    (val) => new Date(val),
    z
      .date({
        error: "Date must be a date",
      })
      .min(1, { error: "Date is required" })
  ),
  items: z.array(
    z.object({
      _id: z
        .string({ error: "ID product must be a string" })
        .length(24, { error: "ID product must be 24 characters" }),
      quantity: z.preprocess(
        (val) => Number(val),
        z
          .number({ error: "Quantity must be a number" })
          .positive({ error: "Quantity must be a postive number" })
      ),
    })
  ),
})

const orderValidation = {
  add,
}
export default orderValidation
