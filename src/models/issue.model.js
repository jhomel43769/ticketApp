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
        ref: 'Project',
        required: true
    },
    reportedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    //---Relacion embebida
    comments: [{
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        text: {type: String, required: true},
        createdAt: {type: Date, default: Date.now}
    }],
    //---archivos adjuntos
    fileName: [{
        fileName: String,
        fileUrl: String,
        mimeType:String,
        uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        uploadedAt: { type: Date, default: Date.now }    
    }],
    createdAt: {
        type: Date,
        default: Date.now
  },
    updatedAt: {
        type: Date,
        default: Date.now
  }
});

issueSchema.pre('save', function(next) {
    this.updatedAt = Data.now();
    next()
})

export const Issue = mongoose.model('Issue', issueSchema)