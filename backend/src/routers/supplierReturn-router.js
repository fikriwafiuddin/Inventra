import express from "express"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/auth-middleware.js"
import supplierReturnController from "../controllers/supplierReturn-controller.js"

const supplierReturnRouter = express.Router()

supplierReturnRouter.post(
  "/",
  clerkMiddleware(),
  authMiddleware,
  supplierReturnController.add
)

export default supplierReturnRouter
