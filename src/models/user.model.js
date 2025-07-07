import mongoose from "mongoose";

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
        toLowerCase: true
    },
    password_hash: {
        type: String,
        required: true
    },
    firtName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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

export const User = mongoose.model('User', userSchema)