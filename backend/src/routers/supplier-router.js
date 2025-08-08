import { clerkMiddleware } from "@clerk/express"
import express from "express"
import authMiddleware from "../middlewares/auth-middleware.js"
import supplierController from "../controllers/supplier-controller.js"

const supplierRouter = express.Router()

supplierRouter.post(
  "/add",
  clerkMiddleware(),
  authMiddleware,
  supplierController.add
)
supplierRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  supplierController.getAll
)
supplierRouter.patch(
  "/update/:id",
  clerkMiddleware(),
  authMiddleware,
  supplierController.update
)
supplierRouter.patch(
  "/update/status/:id",
  clerkMiddleware(),
  authMiddleware,
  supplierController.updateStatus
)
supplierRouter.delete(
  "/delete/:id",
  clerkMiddleware(),
  authMiddleware,
  supplierController.remove
)

export default supplierRouter
