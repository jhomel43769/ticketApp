import express from "express";
import { createProject } from "../controllers/project.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const projectRouter = express.Router();

projectRouter.post('/create', authMiddleware, createProject);

export default projectRouter;