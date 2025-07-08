import  Project  from "../models/project.model.js";
import  User  from "../models/project.model.js"

export const createProject = async (req, res) => {
    try {
        const {name, description, leaderId,  status} = req.body
        const exisitingProject = await Project.findOne({name: name})

        if (!name || !description) {
            return res.status(400).json({message: "Tanto el nombre como la descripcion son campos requeridos"})
        }

        if (exisitingProject) {
            return res.status(400).json({error: "El proyecto que intenta crear ya existe"})
        }

        let leader = null;
        if (leaderId) {
            leader = await User.findOne({leaderId})
        }
        
        
        if (!leader) {
            return res.status(400).json({error: "el lider espesificado no existe"})
        }

        const createProject = Project.create({
            name,
            description,
            createdBy: req.User.id, 
            leader: leader ? leader._id: null,
            status: status || 'activo'
        });


        res.status(201).json({
            success: true,
            message: "proyecto creado con exito",
            data: createProject
        });
    } catch (error) {
        console.error("error al crear el proyecto", error )
        return res.status(500).json("error interno del servidor al crear un projecto")
    }
}