import { ZodError, z } from "zod"
import ResponseError from "../error/error-response.js"

const validation = (schema, request = {}) => {
  try {
    const result = schema.parse(request)
    return result
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = z.flattenError(error).fieldErrors
      throw new ResponseError("Validation failed", 400, errors)
    }
  }
}
export default validation
