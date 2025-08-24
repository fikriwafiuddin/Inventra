import express from "express"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/auth-middleware.js"
import customerReturnController from "../controllers/customerReturn-controller.js"

const customerReturnRouter = express.Router()

customerReturnRouter.post(
  "/",
  clerkMiddleware(),
  authMiddleware,
  customerReturnController.add
)

export default customerReturnRouter
