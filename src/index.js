import express from "express"
import morgan from "morgan"
import cors from "cors"
import { connectDb } from "./config/db.js"
import authRouter from "./routes/user.routes.js"
import projectRouter  from "./routes/project.route.js"
import issueRouter from "./routes/issue.route.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

connectDb()

app.use('/api/auth', authRouter)
app.use('/api/project', projectRouter)
app.use('/api/issue', issueRouter)

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
}) 