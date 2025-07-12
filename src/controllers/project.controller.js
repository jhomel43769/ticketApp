import Project from "../models/project.model.js";
import User from "../models/user.model.js";

export const createProject = async (req, res) => {
    try {
        const { name, description, leaderId, status } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: "Tanto el nombre como la descripción son campos requeridos"
            });
        }

        const existingProject = await Project.findOne({ name: name });
        if (existingProject) {
            return res.status(400).json({
                error: "El proyecto que intenta crear ya existe"
            });
        }

        const currentUser = await User.findById(req.userId).populate('role');
        if (!currentUser) {
            return res.status(401).json({
                error: "Usuario no encontrado"
            });
        }

        const hasPermission = currentUser.role.Permissions.includes('project:create');
        if (!hasPermission) {
            return res.status(403).json({
                error: "No tienes los permisos para crear proyectos"
            });
        }

        let leader = null;
        if (leaderId) {
            leader = await User.findById(leaderId);
            if (!leader) {
                return res.status(400).json({
                    error: "El líder especificado no existe"
                });
            }
        }

        const newProject = await Project.create({
            name,
            description,
            createdBy: req.userId,
            leaderId: leader ? leader._id : null,
            status: status || 'activado'
        });

        res.status(201).json({
            success: true,
            message: "Proyecto creado con éxito",
            data: newProject
        });

    } catch (error) {
        console.error("Error al crear el proyecto:", error);
        return res.status(500).json({
            error: "Error interno del servidor al crear un proyecto"
        });
    }
};