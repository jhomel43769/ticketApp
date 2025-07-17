import Issue from "../models/issue.model.js";
import Project from "../models/project.model.js"
import User from "../models/user.model.js";
import { generateCode } from "../services/genCode.services.js"
import { cloudinary } from "../config/cloudinary.config.js";

export const createIssue = async (req, res) => {
    try {
        const { title, description, type, priority, dueDate, project, assignedTo, status } = req.body;
        console.log("req.body", req.body);
        console.log("req.files", req.files);
        const reportedBy = req.userId;
        const uploadedFiles = req.files;

        if (!title || !description || !type || !priority || !project) {
            return res.status(400).json({ message: "Los campos 'title', 'description', 'type', 'priority' y 'project' son requeridos." });
        }

        const existingProject = await Project.findById(project);
        if (!existingProject) {
            return res.status(400).json({ error: "El proyecto no existe." });
        }

        const code = await generateCode(project);
        const existingIssue = await Issue.findOne({ code: code });

        if (existingIssue) {
            return res.status(400).json({ error: "La issue que intentas crear ya existe." });
        }

        const reportedUser = await User.findById(reportedBy);
        if (!reportedUser) {
            return res.status(400).json({ error: "El usuario que reporta la issue no existe." });
        }

        let assignedUserId = null;
        if (assignedTo) {
            const foundAssignedUser = await User.findById(assignedTo);
            if (!foundAssignedUser) {
                return res.status(400).json({ error: "El usuario al que se le asigna la issue no existe." });
            }
            assignedUserId = foundAssignedUser._id;
        }

        const attachmentsData = [];
        if (uploadedFiles && uploadedFiles.length > 0) {
            for (const file of uploadedFiles) {
                const cloudinaryUploadResult = await cloudinary.uploader.upload(file.buffer.toString('base64'), {
                    resource_type: "auto",
                    folder: `ticketapp_issues/${project}`
                });
                attachmentsData.push({
                    fileName: file.originalname,
                    fileUrl: cloudinaryUploadResult.secure_url,
                    mimeType: file.mimetype,
                    size: file.size,
                    uploadedBy: reportedBy,
                    uploadedAt: new Date()
                });
            }
        }

        const newIssueData = {
            title,
            description,
            type,
            priority,
            status: status || 'Por Hacer',
            dueDate: dueDate || null,
            project: existingProject._id,
            reportedBy: reportedBy,
            assignedTo: assignedUserId,
            code,
            attachments: attachmentsData
        };

        const createdIssue = await Issue.create(newIssueData);

        res.status(201).json({ message: "Issue creada con éxito", issue: createdIssue });
    } catch (error) {
        console.error("error al crear la issue", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) {
            return res.status(400).json({ error: "Ya existe una issue con este código. Intente de nuevo." });
        }
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'El archivo adjunto es demasiado grande (máx. 5MB).' });
        }
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ error: 'Demasiados archivos o nombre de campo incorrecto.' });
        }
        if (error.http_code && error.http_code >= 400) {
            return res.status(error.http_code).json({ error: `Error de Cloudinary: ${error.message}` });
        }
        return res.status(500).json({ error: "Error interno del servidor al crear una issue." });
    }
};

export const getIssues = async (req, res) => {
    try {
        const issues = await Issue.find().populate("project").populate("assignedTo").populate("reportedBy");
        if (!issues || issues.length === 0) {
            return res.status(404).json({ message: "No se encontraron issues." });
        }

        res.status(200).json({ issues });
    } catch (error) {
        console.error("error al obtener las issues", error);
        return res.status(500).json({ error: "error interno del servidor al obtener las issues" });
    }
}
