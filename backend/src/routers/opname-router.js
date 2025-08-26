import express from "express"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/auth-middleware.js"
import opnameController from "../controllers/opname-controller.js"

const opnameRouter = express.Router()

opnameRouter.post("/", clerkMiddleware(), authMiddleware, opnameController.add)
opnameRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  opnameController.getAll
)
opnameRouter.get(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  opnameController.detail
)
opnameRouter.put(
  "/",
  clerkMiddleware(),
  authMiddleware,
  opnameController.update
)

export default opnameRouter
