import { z } from "zod"

const addSupplier = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Supplier name is required"
          : "Invalid supplier name",
    })
    .min(3, { error: "Name must be at least 3 characters long" })
    .max(20, { error: "Name must be at most 20 characters" }),
  email: z
    .email({ error: "Invalid email" })
    .max(50, { error: "Email must be at most 50 characters" }),
  phone: z
    .string()
    .min(10, { error: "Phone number must be at least 10 characters long" })
    .max(14, { error: "Phone number must be at most 14 characters long" })
    .regex(/^(\+62|62|0)[1-9][0-9]{7,12}$/, { error: "Invalid phone number" }),
  address: z
    .string()
    .min(10, { error: "Address must be at least 10 characters long" })
    .max(200, { error: "Address must be at most 200 characters" })
    .optional(),
})

const supplierValidation = {
  addSupplier,
}

export default supplierValidation
