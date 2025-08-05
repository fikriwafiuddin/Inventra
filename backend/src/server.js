import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./utils/connectDB.js"
import router from "./routers/router.js"
import logger from "./utils/logger.js"
import httpLogger from "./middlewares/httpLogger.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(httpLogger)

connectDB()

app.use(router)

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})
