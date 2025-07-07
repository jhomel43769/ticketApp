import mongoose, { model, Schema } from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdByUserId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    leaders: {
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

export const Project = mongoose.model('Project', projectSchema)