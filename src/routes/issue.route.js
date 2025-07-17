import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createIssue, getIssues } from "../controllers/issue.controller.js";
import  { upload }  from "../middlewares/multerMiddleware.js";
const issueRouter = express.Router()

issueRouter.post('/create', authMiddleware,upload.array('attachments', 5), createIssue)
issueRouter.get('/showissues', authMiddleware, getIssues);

export default issueRouter;

