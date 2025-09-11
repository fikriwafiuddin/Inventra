import { clerkMiddleware } from "@clerk/express"
import express from "express"
import authMiddleware from "../middlewares/auth-middleware.js"
import productController from "../controllers/product-controller.js"
import uploadFile from "../middlewares/uploadeFile.js"

const productRouter = express.Router()

productRouter.get(
  "/search",
  clerkMiddleware(),
  authMiddleware,
  productController.search
)
productRouter.post(
  "/",
  clerkMiddleware(),
  authMiddleware,
  uploadFile,
  productController.create
)
productRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  productController.getAll
)
productRouter.delete(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  productController.remove
)
productRouter.get(
  "/:sku",
  clerkMiddleware(),
  authMiddleware,
  productController.detail
)
productRouter.patch(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  uploadFile,
  productController.update
)

export default productRouter
