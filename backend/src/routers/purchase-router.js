import express from "express"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/auth-middleware.js"
import purchaseController from "../controllers/purchase-controller.js"

const purchaseRouter = express.Router()

purchaseRouter.post(
  "/add",
  clerkMiddleware(),
  authMiddleware,
  purchaseController.add
)

export default purchaseRouter
