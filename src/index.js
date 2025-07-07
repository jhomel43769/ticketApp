import express from "express"
import morgan from "morgan"
import cors from "cors"
import { connectDb } from "./config/db.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

connectDb()

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
}) 