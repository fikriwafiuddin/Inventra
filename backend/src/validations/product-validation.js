import { z } from "zod"

const add = z.object({
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
  sku: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "SKU is required" : "Invalid SKU",
    })
    .min(4, "SKU must be at least 4 characters")
    .max(10, "SKU must be at most 10 characters"),
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
  sku: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "SKU is required" : "Invalid SKU",
    })
    .min(4, "SKU must be at least 4 characters")
    .max(10, "SKU must be at most 10 characters"),
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

const productValidation = {
  add,
  update,
  search,
}
export default productValidation
