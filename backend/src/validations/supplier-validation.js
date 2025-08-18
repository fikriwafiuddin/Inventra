import { email, z } from "zod"

const add = z.object({
  name: z.string({
    error: (issue) =>
      issue.input === undefined ? "Name is required" : "Invalid name",
  }),
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
    .max(200, { error: "Address must be at most 200 characters long" })
    .optional(),
})

const update = z.object({
  id: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "ID is required" : "Invalid ID",
    })
    .length(24, { error: "ID must be 24 characters long" }),
  name: z.string({
    error: (issue) =>
      issue.input === undefined ? "Name is required" : "Invalid name",
  }),
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
    .max(200, { error: "Address must be at most 200 characters long" })
    .optional(),
})

const status = z.object({
  id: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "ID is required" : "Invalid ID",
    })
    .length(24, { error: "ID must be 24 characters long" }),
  status: z.enum(["active", "inactive"], {
    error: "Status must be active or inactive",
  }),
})

const search = z.object({
  query: z.string({ error: "Query must be a string" }).optional(),
  limit: z.preprocess(
    (val) => Number(val),
    z
      .number({
        error: (issue) =>
          issue.input === undefined ? "Limit is required" : "Invalid limit",
      })
      .positive({ error: "Limit must be a positive number" })
  ),
})

const supplierValidation = {
  add,
  update,
  status,
  search,
}
export default supplierValidation
