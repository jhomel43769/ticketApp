import mongoose, { Schema } from "mongoose"; 

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: ['Peticion', 'Tarea', 'Error'],
        required: true
    },
    priority: {
        type: String,
        enum: ['Por Hacer', 'En Progreso', 'En revisión', 'Terminada'],
        default: 'Por Hacer'
    },
    dueDate: {
        type: Date
    },

    //---RELACIONES CON USUAIROS Y PROYECTOS---

    project: {
        type: Schema.Types.ObjectId,
        ref: 'Proyect'
    }
})