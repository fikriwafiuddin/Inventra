import { z } from "zod"

const add = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Category name is required"
          : "Invalid category name",
    })
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters"),
})

const update = z.object({
  id: z.string().length(24, "Invalid category ID"),
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Category name is required"
          : "Invalid category name",
    })
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters"),
})

const categoryValidation = {
  add,
  update,
}

export default categoryValidation
