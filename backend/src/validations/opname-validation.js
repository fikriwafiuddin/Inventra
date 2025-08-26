import { z } from "zod"

const add = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name is required"
          : "Name must be a string",
    })
    .min(3, { error: "Name must be at least 3 characters" })
    .max(40, { error: "Name must be at most 40 characters" }),
})

const update = z.object({
  id: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name is required"
          : "Name must be a string",
    })
    .length(24, { error: "ID must be 24 characters" }),
  items: z.array(
    z.object({
      id: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? "Product ID is required"
              : "Product ID must be a string",
        })
        .length(24, { error: "Product ID must be 24 characters" }),
      physicalStock: z.preprocess(
        (val) => Number(val),
        z.number({
          error: (issue) =>
            issue.input === undefined
              ? "Physical stock is required"
              : "Physical Stock must be a number",
        })
      ),
    })
  ),
  status: z
    .enum(["completed", "incomplete"], {
      error: "Status must be either 'completed' or 'incomplete'",
    })
    .optional(),
})

const opnameValidation = {
  add,
  update,
}
export default opnameValidation
