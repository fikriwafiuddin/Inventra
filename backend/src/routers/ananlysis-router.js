import express from "express"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/auth-middleware.js"
import analysisController from "../controllers/ananlysis-controller.js"

const ananlysisRouter = express.Router()

ananlysisRouter.get(
  "/sales",
  clerkMiddleware(),
  authMiddleware,
  analysisController.sales
)

export default ananlysisRouter
