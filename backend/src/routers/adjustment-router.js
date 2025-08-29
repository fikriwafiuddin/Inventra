import express from "express"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/auth-middleware.js"
import adjustmentController from "../controllers/adjustment-controller.js"

const adjustmentRouter = express.Router()

adjustmentRouter.post(
  "/",
  clerkMiddleware(),
  authMiddleware,
  adjustmentController.add
)
adjustmentRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  adjustmentController.getAll
)

export default adjustmentRouter
