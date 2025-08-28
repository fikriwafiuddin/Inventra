import express from "express"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/auth-middleware.js"
import stockMovementController from "../controllers/stockMovement-controller.js"

const stockMovementRouter = express.Router()

stockMovementRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  stockMovementController.getAll
)

export default stockMovementRouter
