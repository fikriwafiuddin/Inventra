import express from "express"
import categoryRouter from "./category-router.js"
import productRouter from "./product-routes.js"
import errorMiddleware from "../middlewares/error-middleware.js"

const router = express.Router()

router.use("/category", categoryRouter)
router.use("/product", productRouter)

router.use(errorMiddleware)

export default router
