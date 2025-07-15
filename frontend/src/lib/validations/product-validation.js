import { z } from "zod"

const addProduct = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  image: z
    .instanceof(File)
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
    z.number().positive({ error: "Price must be positive number" })
  ),
  category: z.string().length(24, "Category must be 24 characters"),
  description: z
    .string()
    .max(100, "Description must be at most 100 characters")
    .optional(),
})

const productValidation = {
  addProduct,
}

export default productValidation
