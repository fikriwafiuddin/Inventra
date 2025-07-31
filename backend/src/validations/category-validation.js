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
    .max(50, "Name must be at most 50 characters"),
})

const categoryValidation = {
  add,
}

export default categoryValidation
