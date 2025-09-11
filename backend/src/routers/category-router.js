import express from "express"
import { requireAuth, clerkMiddleware } from "@clerk/express"
import categoryController from "../controllers/category-controller.js"
import authMiddleware from "../middlewares/auth-middleware.js"

const categoryRouter = express.Router()

categoryRouter.post(
  "/",
  clerkMiddleware(),
  authMiddleware,
  categoryController.create
)
categoryRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  categoryController.getAll
)
categoryRouter.delete(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  categoryController.remove
)
categoryRouter.put(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  categoryController.update
)

export default categoryRouter
