import { z } from "zod"

const analysisQuerySchema = z.object({
  timePeriod: z
    .enum(["1d", "7d", "30d", "90d", "180d", "1y"], {
      error: "Invalid time period",
    })
    .default("1d"),
})

const analysisValidation = {
  analysisQuerySchema,
}
export default analysisValidation
