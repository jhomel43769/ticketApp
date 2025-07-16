import jwt from 'jsonwebtoken';
import User from "../models/user.model.js"; 

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Acceso denegado: Token no proporcionado o formato incorrecto.' });
        }
        const token = authHeader.replace('Bearer ', '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Acceso denegado: Usuario no encontrado.' });
        }
        req.userId = decoded.userId;

        next();

    } catch (error) {
        console.error("Error en authMiddleware:", error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Token inválido.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expirado.' });
        }
        return res.status(401).json({ error: "No autorizado." });
    }
};