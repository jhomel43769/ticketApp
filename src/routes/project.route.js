import express from "express";
import { createProject, getProjects } from "../controllers/project.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const projectRouter = express.Router();

projectRouter.post('/create', authMiddleware, createProject);

projectRouter.get('/showprojects', getProjects)

export default projectRouter;