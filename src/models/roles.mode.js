import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    Permissions: [{
        type: String,
        enum: [
        'project:create', 'project:read', 'project:update', 'project:delete',
        'issue:create', 'issue:read', 'issue:update', 'issue:delete',
        'user:read_all', 'user:manage_roles'    
        ]
    }]
})

roleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const Roles = mongoose.model('Roles', roleSchema);

