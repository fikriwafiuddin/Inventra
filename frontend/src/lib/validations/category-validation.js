import { z } from "zod"

const addCategory = z.object({
  name: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Category name is required"
        : "Invalid category name",
  }),
})

const categoryValidation = {
  addCategory,
}

export default categoryValidation
