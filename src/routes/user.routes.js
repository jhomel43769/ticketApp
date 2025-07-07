import { getProfileById, getProfiles, login, register } from "../controllers/user.controller.js";
import express from "express"

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)

authRouter.get('/profiles', getProfiles)
authRouter.get('/profile:id', getProfileById)


export default authRouter