import express from "express";
import { createProject,  getProjects, getProjectById, updateProject, deleteProject,} from "../controllers/project.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const projectRouter = express.Router();

projectRouter.post('/create', authMiddleware, createProject);

projectRouter.get('/showprojects', getProjects);
projectRouter.get('/:id', authMiddleware, getProjectById);

projectRouter.put('/:id', authMiddleware, updateProject);

projectRouter.delete('/:id', authMiddleware, deleteProject);


export default projectRouter;