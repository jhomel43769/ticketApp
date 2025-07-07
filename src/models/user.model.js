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
        type: Data,
        default: data.now
    },
    updatedAt: {
        type: Data,
        default: Data.now
    }
})

userSchema.pre('save', function(next) {
    this.updatedAt = Data.now()
    next()
} )

export const User = mongoose.model('User', userSchema)