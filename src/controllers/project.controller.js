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

        const hasPermission = currentUser.role && currentUser.role.Permissions && currentUser.role.Permissions.includes('project:create');
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
            leader: leader ? leader._id : null, 
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

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({})
            .populate('createdBy')
            .populate('leader' );
        res.status(200).json({ success: true, data: projects });

    } catch (error) {
        console.error("Error al obtener proyectos:", error);
        return res.status(500).json({
            error: "Error interno del servidor al obtener proyectos."
        });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId)
            .populate('createdBy')
            .populate('leader')
        if (!project) {
            return res.status(404).json({
                error: "Proyecto no encontrado"
            });
        }
        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error("Error al obtener el proyecto:", error);
        return res.status(500).json({
            error: "Error interno del servidor al obtener el proyecto."
        });
    }
};  

export const updateProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { name, description, leaderId, status } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({
                error: "Proyecto no encontrado"
            });
        }

        if (name) {
            project.name = name;
        }
        if (description) {
            project.description = description;
        }
        if (leaderId) {
            const leader = await User.findById(leaderId);
            if (!leader) {
                return res.status(400).json({
                    error: "El líder especificado no existe"
                });
            }
            project.leader = leader._id;
        }
        if (status) {
            const validStatuses = ['activado', 'desactivado'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({
                    error: `Estado inválido. Debe ser uno de: ${validStatuses.join(', ')}`
                });
            }
            project.status = status;
        }
        await project.save();
        res.status(200).json({
            success: true,
            message: "Proyecto actualizado con éxito",
            data: project
        });
    } catch (error) {
        console.error("Error al actualizar el proyecto:", error);
        return res.status(500).json({
            error: "Error interno del servidor al actualizar el proyecto."
        });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findByIdAndDelete(projectId);
        if (!project) {
            return res.status(404).json({
                error: "Proyecto no encontrado"
            });
        }
        res.status(200).json({
            success: true,
            message: "Proyecto eliminado con éxito"
        });
    } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
        return res.status(500).json({
            error: "Error interno del servidor al eliminar el proyecto."
        });
    }
};
