import express from "express"
import { requireAuth, clerkMiddleware } from "@clerk/express"
import categoryController from "../controllers/category-controller.js"
import authMiddleware from "../middlewares/auth-middleware.js"

const categoryRouter = express.Router()

categoryRouter.post(
  "/add",
  clerkMiddleware(),
  authMiddleware,
  categoryController.add
)
categoryRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  categoryController.getAll
)
categoryRouter.delete(
  "/delete/:id",
  clerkMiddleware(),
  authMiddleware,
  categoryController.remove
)
categoryRouter.put(
  "/update/:id",
  clerkMiddleware(),
  authMiddleware,
  categoryController.update
)

export default categoryRouter
