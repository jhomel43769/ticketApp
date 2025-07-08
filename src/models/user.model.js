import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password_hash: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'role',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next()
} )

const User = mongoose.model('User', userSchema)
export default User