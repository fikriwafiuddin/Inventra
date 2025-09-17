import { z } from "zod"

const add = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Product name is required"
          : "Invalid product name",
    })
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  category: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Category is required" : "Invalid category",
    })
    .length(24, "Category must be 24 characters"),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number({
        error: (issue) =>
          issue.input === undefined ? "Price is required" : "Invalid price",
      })
      .positive({ error: "Price must be a positive number" })
  ),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  minStock: z.preprocess(
    (val) => Number(val),
    z
      .number({
        error: (issue) =>
          issue.input === undefined
            ? "Min stock is required"
            : "Invalid min stock",
      })
      .nonnegative({ error: "Min stock must be a non-negative number" })
  ),
  image: z.object({
    url: z.url({
      error: (issue) =>
        issue.input === undefined
          ? "Image URL is required"
          : "Invalid image URL",
    }),
    cloudinaryId: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Cloudinary ID is required"
            : "Invalid Cloudinary ID",
      })
      .min(1, "Cloudinary ID is required"),
  }),
})

const update = z.object({
  id: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "ID is required" : "Invalid ID",
    })
    .length(24, "Id must be 24 characters"),
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Product name is required"
          : "Invalid product name",
    })
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters"),
  category: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Category is required" : "Invalid category",
    })
    .length(24, "Category must be 24 characters"),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number({
        error: (issue) =>
          issue.input === undefined ? "Price is required" : "Invalid price",
      })
      .positive({ error: "Price must be a positive number" })
  ),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  minStock: z.preprocess(
    (val) => Number(val),
    z
      .number({
        error: (issue) =>
          issue.input === undefined
            ? "Min stock is required"
            : "Invalid min stock",
      })
      .nonnegative({ error: "Min stock must be a non-negative number" })
  ),
  image: z
    .object({
      url: z.url({
        error: (issue) =>
          issue.input === undefined
            ? "Image URL is required"
            : "Invalid image URL",
      }),
      cloudinaryId: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? "Cloudinary ID is required"
              : "Invalid Cloudinary ID",
        })
        .min(1, "Cloudinary ID is required"),
    })
    .optional()
    .nullable(),
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

const getAll = z.object({
  page: z.preprocess(
    (val) => Number(val),
    z
      .number("Page must be a number")
      .positive("Page must be a positive number")
      .optional()
  ),
  limit: z.preprocess(
    (val) => Number(val),
    z
      .number("Limit must be a number")
      .positive("Limit must be a positive number")
      .optional()
  ),
  category: z.string("Category must be a string").optional(),
  search: z.string("Search must be a string").optional(),
})

const productValidation = {
  add,
  update,
  search,
  getAll,
}
export default productValidation
