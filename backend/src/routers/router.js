import express from "express"
import categoryRouter from "./category-router.js"
import productRouter from "./product-routes.js"
import errorMiddleware from "../middlewares/error-middleware.js"
import statisticRouter from "./statistic-router.js"
import supplierRouter from "./supplier-router.js"
import purchaseRouter from "./purchase-router.js"
import orderRouter from "./order-router.js"
import adjustmentRouter from "./adjustment-router.js"
import customerReturnRouter from "./customerReturnRouter.js"
import supplierReturnRouter from "./supplierReturn-router.js"
import opnameRouter from "./opname-router.js"
import stockMovementRouter from "./stockMovement-router.js"
import ananlysisRouter from "./ananlysis-router.js"

const router = express.Router()

router.use("/categories", categoryRouter)
router.use("/products", productRouter)
router.use("/statistic", statisticRouter)
router.use("/supplier", supplierRouter)
router.use("/purchase", purchaseRouter)
router.use("/order", orderRouter)
router.use("/adjustment", adjustmentRouter)
router.use("/customer-return", customerReturnRouter)
router.use("/supplier-return", supplierReturnRouter)
router.use("/opname", opnameRouter)
router.use("/stock-movement", stockMovementRouter)
router.use("/analysis", ananlysisRouter)

router.use(errorMiddleware)

export default router
