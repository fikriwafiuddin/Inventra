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

export default statisticRouter
