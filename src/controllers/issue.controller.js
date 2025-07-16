import Issue from "../models/issue.model.js";
import Project from "../models/project.model.js"
import User from "../models/user.model.js";
import { generateCode } from "../services/genCode.services.js"

export const createIssue = async (req, res) => {
    try {
        const {title, description, type, priority, dueDate, project, assignedTo} = req.body
        const reportedBy = req.userId 

        if (!title || !description || !type || !priority || !project) {
            return res.status(400).json({ message: "Los campos 'title', 'description', 'type', 'priority' y 'project' son requeridos." });
        }

        const existingProject = await Project.findById(project)
        if (!existingProject) {
            return res.status(400).json({error: "el projecto no existe"})
        }; 

        const code = await generateCode(project)
        const existingIssue = await Issue.findOne({code: code})

        if (existingIssue) {
            return res.status(400).json({error: "la issue que intentas crear ya existe"})
        }

        const reportedUser = await User.findById(assignedTo)
        if (!reportedUser) {
            return res.status(400).json({error: "el usuario que reporta la issue no existe"})
        }

        const assignedUser = await User.findById(assignedTo)
        if (!assignedUser) {
            return res.status(400).json({error: "el usuario al que se le asigna la issue no existe"})
        }

        const newIssueData = {
            title,
            description,
            type,
            priority,
            project: existingProject._id,
            dueDate,
            reportedBy: reportedBy,
            assignedTo: assignedTo ? reportedUser._id: null, 
            code
        }
        const createIssue = await Issue.create(newIssueData)

        res.status(201).json({message: "issue creada con exiso", issue: createIssue})
    } catch (error) {
        console.error("error al crear la issue", error)
        return res.status(500).json({error: "error interno del servidor al crear una issue"})
    }
}

export const getIssues = async (req, res) => {
    try {
        const issues = await Issue.find().populate("project").populate("assignedTo").populate("reportedBy");
        res.status(200).json({ issues });
    } catch (error) {
        console.error("error al obtener las issues", error);
        return res.status(500).json({ error: "error interno del servidor al obtener las issues" });
    }
}
