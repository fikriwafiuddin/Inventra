import { z } from "zod"

const add = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(3, { error: "Name must be at least 3 characters" })
    .max(40, { error: "Name must be at most 40 characters" }),
})

const opnameValidation = {
  add,
}
export default opnameValidation
