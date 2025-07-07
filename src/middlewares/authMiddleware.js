import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId);

        if (!user) {
            throw new Error();
        }

        req.userId = decoded.userId;
        next()
    } catch (error) {
        res.status(401).json({error: "not authorized"})
    }
}