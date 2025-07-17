import Issue from "../models/issue.model.js";
import Project from "../models/project.model.js"; 

export const generateCode = async (projectId) => { 
    try {
        const projectDoc = await Project.findById(projectId); 
        if (!projectDoc) {
            throw new Error("Proyecto no encontrado para generar el código.");
        }

        const prefix = projectDoc.name.substring(0, 3).toUpperCase(); 

        const count = await Issue.countDocuments({ project: projectId });

        const code = `${prefix}-${String(count + 1).padStart(3, '0')}`;
        return code;

    } catch (error) {
        console.error("Error en el servicio generateCode:", error);
        throw error;
    }
};