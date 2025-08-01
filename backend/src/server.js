import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./utils/connectDB.js"
import router from "./routers/router.js"

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

connectDB()

app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
