import { z } from "zod"

const settings = z.object({
  companyName: z
    .string({ error: "Company name must be a string" })
    .min(1, { error: "Company name is required" })
    .max(20, { error: "Company name must be at most 20 characters" }),
  currency: z.enum(["IDR", "USD", "EUR"], { error: "Invalid currency" }),
  address: z
    .string({ error: "Address must be a string" })
    .max(30, { error: "Address must be at most 30 characters" })
    .optional(),
  language: z.enum(["id", "en"], { error: "Invalid language" }),
})

const settingValidation = {
  settings,
}

export default settingValidation
