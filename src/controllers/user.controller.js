import User from '../models/user.model.js'
import Roles from '../models/roles.model.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { seendEmail } from '../services/seendEmail.js';

export const register = async (req, res) => {
    try {
        const { username, email, password_hash, firstName, lastName, role: roleName, createdAt, updatedAt } = req.body
        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return res.status(400).json({ error: "el email que intenta registrar ya existe" })
        }

        if (!roleName) {
            return res.status(400).json({ error: "Rol invalido" })
        }

        const roleDoc = await Roles.findById(roleName)
        if (!roleDoc) {
            return res.status(400).json({ error: 'rol no encontrado' })
        }

        if (!username, !email, !password_hash, !firstName, !lastName, !roleName) {
            return res.status(400).json({error: "los campos: <username> <email> <password_hash> <firstName> <lastName> <roleName> Son requeridos"})
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
            role: roleDoc._id,
            createdAt,
            updatedAt
        });

        await user.save();

        seendEmail(email, username).then(success => {
            if (success) {
                console.log("email de registro enviado cn exito")
            } else {
                console.warn('fallo al enfiar el email de registro')
            } 
        });

        const userResponse = user.toObject();
        delete userResponse.password_hash

        return res.status(201).json({ message: "usuario creado con exito"})
    } catch (error) {
        console.error("error al registrar un usuario", error)
        return res.status(500).json({ error: "error interno del servidor al intentar registrar un usuario" })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password_hash } = req.body
        if (!email || !password_hash) {
            return res.status(400).json({ error: "Ambos campos son requeridos" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "credenciales invalidas" })
        }
        const isMatch = await bcrypt.compare(password_hash, user.password_hash)
        if (!isMatch) {
            return res.status(400).json({ error: "contraseña incorrecta" })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        const userResponse = user.toObject()
        delete userResponse.password_hash

        res.status(201).json({ message: "session inciada con exito", token: token, user: userResponse })
    } catch (error) {
        console.error("error al iniciar sesion", error)
        return res.status(500).json({ error: "error interno del servidor al iniciar sesion" })
    }
};

export const getProfiles = async (req, res) => {
    try {
        const users = await User.find({}).populate('role')

        if (!users) {
            return res.status(400).json({ error: "no se encuentran usuarios" })
        }

        res.status(200).json({ users })
    } catch (error) {
        console.error("error al obtener los usuarios", error)
        return res.status(500).json({ error: "error interno del servidor al obtener los usuarios" })
    }
};

export const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('role')

        if (!user) {
            return res.status(400).json({ error: "el usuario que intenta buscar no existe" })
        }
        res.status(200).json({ user })
    } catch (error) {
        console.error("error al ontener el usuario", error)
        return res.status(500).json({ error: "error interno del servidor al obtejer el usuario" })
    }
}