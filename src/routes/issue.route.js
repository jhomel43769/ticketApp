import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createIssue, getIssues, getIssueById} from "../controllers/issue.controller.js";
import { upload } from "../middlewares/multerMiddleware.js";
import { sanitizeRequestBody } from "../middlewares/sanitizeMiddleware.js";

const issueRouter = express.Router();

issueRouter.post('/create', authMiddleware, upload.array('attachments', 5), sanitizeRequestBody, createIssue);
issueRouter.get('/showissues', authMiddleware, getIssues);
issueRouter.get('/showissues/:id', authMiddleware, getIssueById);   

export default issueRouter;