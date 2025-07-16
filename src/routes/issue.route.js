import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createIssue, getIssues } from "../controllers/issue.controller.js";

const issueRouter = express.Router()

issueRouter.post('/create', authMiddleware, createIssue)
issueRouter.get('/showissues', authMiddleware, getIssues);

export default issueRouter;

