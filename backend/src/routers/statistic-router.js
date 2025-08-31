import express from "express"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/auth-middleware.js"
import statisticController from "../controllers/statistic-controller.js"

const statisticRouter = express.Router()

statisticRouter.get(
  "/product",
  clerkMiddleware(),
  authMiddleware,
  statisticController.product
)
statisticRouter.get(
  "/supplier",
  clerkMiddleware(),
  authMiddleware,
  statisticController.supplier
)
statisticRouter.get(
  "/stock-movement/summary",
  clerkMiddleware(),
  authMiddleware,
  statisticController.stockMovementSummary
)
statisticRouter.get(
  "/stock/summary",
  clerkMiddleware(),
  authMiddleware,
  statisticController.stockSummary
)
statisticRouter.get(
  "/dashboard",
  clerkMiddleware(),
  authMiddleware,
  statisticController.dashboard
)
statisticRouter.get(
  "/weekly-income/month",
  clerkMiddleware(),
  authMiddleware,
  statisticController.weeklyIncomeInMonth
)
statisticRouter.get(
  "/latest-orders",
  clerkMiddleware(),
  authMiddleware,
  statisticController.latestOrders
)
statisticRouter.get(
  "/top-products",
  clerkMiddleware(),
  authMiddleware,
  statisticController.topProducts
)
statisticRouter.get(
  "/stock-alert",
  clerkMiddleware(),
  authMiddleware,
  statisticController.stockAlert
)

export default statisticRouter
