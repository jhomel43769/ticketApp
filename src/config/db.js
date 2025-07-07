import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/TicketAppDb')
        console.log("base de datos conectada con exito")
    } catch (error) {
        console.error("error al contectar la base de datos")
    }
}