import { clerkMiddleware } from "@clerk/express"
import express from "express"
import authMiddleware from "../middlewares/auth-middleware.js"
import productController from "../controllers/product-controller.js"
import uploadFile from "../middlewares/uploadeFile.js"

const productRouter = express.Router()

productRouter.post(
  "/add",
  clerkMiddleware(),
  authMiddleware,
  uploadFile,
  productController.add
)
productRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  productController.getAll
)
productRouter.delete(
  "/delete/:id",
  clerkMiddleware(),
  authMiddleware,
  productController.remove
)
productRouter.get(
  "/detail/:sku",
  clerkMiddleware(),
  authMiddleware,
  productController.detail
)
productRouter.patch(
  "/update",
  clerkMiddleware(),
  authMiddleware,
  uploadFile,
  productController.update
)
productRouter.get(
  "/search",
  clerkMiddleware(),
  authMiddleware,
  productController.search
)

export default productRouter
