import express from "express"
import categoryRouter from "./category-router.js"
import productRouter from "./product-routes.js"
import errorMiddleware from "../middlewares/error-middleware.js"
import statisticRouter from "./statistic-router.js"
import supplierRouter from "./supplier-router.js"
import purchaseRouter from "./purchase-router.js"
import orderRouter from "./order-router.js"
import adjustmentRouter from "./adjustment-router.js"

const router = express.Router()

router.use("/category", categoryRouter)
router.use("/product", productRouter)
router.use("/statistic", statisticRouter)
router.use("/supplier", supplierRouter)
router.use("/purchase", purchaseRouter)
router.use("/order", orderRouter)
router.use("/adjustment", adjustmentRouter)

router.use(errorMiddleware)

export default router
