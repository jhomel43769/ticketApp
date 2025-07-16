import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { createIssue } from "../controllers/issue.controller.js";

const issueRouter = express.Router()

issueRouter.post('/create', authMiddleware, createIssue)

export default issueRouter;

