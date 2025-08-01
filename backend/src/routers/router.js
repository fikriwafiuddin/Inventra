import express from "express"
import categoryRouter from "./category-router.js"
import errorMiddleware from "../middlewares/error-middleware.js"

const router = express.Router()

router.use("/category", categoryRouter)

router.use(errorMiddleware)

export default router
