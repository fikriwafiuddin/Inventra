import { z } from "zod"

const settings = z.object({
  companyName: z
    .string({ error: "Company name must be a string" })
    .min(3, { error: "Company name must be at least 3 characters" })
    .max(20, { error: "Company name must be at most 20 characters" }),
  address: z
    .string({ error: "Address must be a string" })
    .min(3, "Address must be at least 3 characters")
    .max(255, "Address must be at most 255 characters"),
  phone: z
    .string()
    .min(7, { error: "Phone number must be at least 7 characters long" })
    .max(18, { error: "Phone number must be at most 18 characters long" })
    .regex(/^[\+]?[1-9][\d\-\(\)\s]{6,16}$/, {
      error: "Invalid phone number format",
    })
    .transform((value) => value.replace(/[\s\-\(\)]/g, "")),
})

const settingValidation = {
  settings,
}

export default settingValidation
