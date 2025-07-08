import mongoose, { Schema } from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    leaderId: {
        type: String,
        ref: 'User'
    },
        createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['activado', 'archivado','completado']
    }
})

projectSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next()
} )

const Project = mongoose.model('Project', projectSchema)
export default Project;