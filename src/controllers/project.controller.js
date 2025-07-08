import Project from "../models/project.model.js";

export const createProject = async (req, res) => {
    try {
        const {name, description, createdByUserId, leaders, createdAt, updatedAt, status} = req.body
        const exisitingProject = await Project.findOne({name: name})

        if (exisitingProject) {
            return res.status(400).json({error: "El proyecto que intenta crear ya existe"})
        }
    }
}