import mongoose, { model, Schema } from "mongoose";

const proyectSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Data,
        default: Data.now
    },
    createdByUserId: {
        type: Schema.Types.ObjectId,
        unique:true,
        required: true
    },
    leaders: {
        type: String,
        ref: 'User'
    },
        createdAt:{
        type: Data,
        default: data.now
    },
    updatedAt: {
        type: Data,
        default: Data.now
    },
    status: {
        type: String,
        enum: ['avtivo', 'archivado','completado']
    }
})

proyectSchema.pre('save', function(next) {
    this.updatedAt = Data.now()
    next()
} )

export const Proyect = mongoose.model('Proyect', proyectSchema)