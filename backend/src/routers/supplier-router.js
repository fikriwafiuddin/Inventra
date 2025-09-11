import { clerkMiddleware } from "@clerk/express"
import express from "express"
import authMiddleware from "../middlewares/auth-middleware.js"
import supplierController from "../controllers/supplier-controller.js"

const supplierRouter = express.Router()

supplierRouter.post(
  "/",
  clerkMiddleware(),
  authMiddleware,
  supplierController.create
)
supplierRouter.get(
  "/search",
  clerkMiddleware(),
  authMiddleware,
  supplierController.search
)
supplierRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  supplierController.getAll
)
supplierRouter.patch(
  "/status/:id",
  clerkMiddleware(),
  authMiddleware,
  supplierController.updateStatus
)
supplierRouter.patch(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  supplierController.update
)
supplierRouter.delete(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  supplierController.remove
)

export default supplierRouter
