import mongoose, { Schema } from "mongoose";

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Peticion', 'Tarea', 'Error'],
        required: true
    },
    priority: {
        type: String,
        enum: ['Baja', 'Media', 'Alta', 'Critica'],
        default: 'Media',
        required: true
    },
    status: {
        type: String,
        enum: ['Por Hacer', 'En Progreso', 'En revisión', 'Terminada'],
        default: 'Por Hacer',
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },

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
        ref: 'User',
        required: true
    },
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    attachments: [{
        fileName: { type: String, required: true },
        fileUrl: { type: String, required: true },
        mimeType: { type: String, required: true },
        size: { type: Number, required: true },
        uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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

issueSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next()
})

const Issue = mongoose.model('Issue', issueSchema)
export default Issue