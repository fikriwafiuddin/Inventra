import { z } from "zod"

const addProduct = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Product name is required"
          : "Invalid product name",
    })
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  image: z
    .instanceof(File, { error: "Image is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      error: "Image size must be at most 5MB",
    })
    .refine(
      (file) =>
        ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
          file.type
        ),
      { error: "Only jpg, jpeg, png, webp images are allowed" }
    ),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number("Price is required")
      .positive({ error: "Price must be positive number" })
  ),
  category: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Category is required" : "Invalid category",
    })
    .length(24, "Category must be 24 characters"),
  minStock: z.preprocess(
    (val) => Number(val),
    z
      .number("Min stock is required")
      .nonnegative({ error: "Min stock must be a non-negative number" })
  ),
  sku: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "SKU is required" : "Invalid SKU",
    })
    .min(4, "SKU must be at least 4 characters")
    .max(10, "SKU must be at most 10 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
})

const update = z.object({
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
    .instanceof(File, { error: "Image is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      error: "Image size must be at most 5MB",
    })
    .refine(
      (file) =>
        ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
          file.type
        ),
      { error: "Only jpg, jpeg, png, webp images are allowed" }
    )
    .optional(),
})

const productValidation = {
  addProduct,
  update,
}

export default productValidation
