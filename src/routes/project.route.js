import express from "express"
import { createProject } from "../controllers/project.controller.js"

const projectRouter = express.Router()

projectRouter.post('/create', createProject)

export default projectRouter;