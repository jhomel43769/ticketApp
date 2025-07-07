import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    try {
        const {username, email, password_hash, firstName, lastName, createdAt, updatedAt} = req.body
        const existingUser = await User.findOne({email: email})

        if (existingUser) {
            return res.status(400).json({error: "el email que intenta registrar ya existe"})
        }

        const salt = await bcrypt.genSalt(10)
        console.log("sal generado:", salt)
        const hash = await bcrypt.hash(password_hash, salt);
        const user = new User({
            username,
            email,
            password_hash: hash,
            firstName,
            lastName,
            createdAt,
            updatedAt
        });

        await user.save();
    
        const userResponse = user.toObject();
        delete userResponse.password_hash

        return res.status(201).json({message: "usuario creado con exito"})
    } catch (error) {
        console.error("error al registrar un usuario", error)
        return res.status(500).json({error: "error interno del servidor al intentar registrar un usuario"})
    }
}