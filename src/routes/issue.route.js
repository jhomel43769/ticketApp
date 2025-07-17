import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createIssue, getIssues } from "../controllers/issue.controller.js";
import { upload } from "../middlewares/multerMiddleware.js";
import { sanitizeRequestBody } from "../middlewares/sanitizeMiddleware.js";

const issueRouter = express.Router();

// Aplicar middleware de sanitización antes de crear la issue
issueRouter.post('/create', authMiddleware, upload.array('attachments', 5), sanitizeRequestBody, createIssue);
issueRouter.get('/showissues', authMiddleware, getIssues);

export default issueRouter;