import express from "express"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/auth-middleware.js"
import orderController from "../controllers/order-controller.js"

const orderRouter = express.Router()

orderRouter.post("/", clerkMiddleware(), authMiddleware, orderController.add)

export default orderRouter
