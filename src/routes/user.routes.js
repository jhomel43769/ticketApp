import { register } from "../controllers/user.controller.js";
import express from "express"

const authRouter = express.Router()

authRouter.post('/register', register)


export default authRouter