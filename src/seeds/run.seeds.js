import mongoose from "mongoose";
import { seedRoles } from "../seeds/roles.seeds.js"

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/TicketAppDb";

try {
  await mongoose.connect(MONGO_URI);
  console.log("Conectado a la base de datos");
  await seedRoles();
  process.exit(0);
} catch (err) {
  console.error("Error al conectar o sembrar:", err);
  process.exit(1);
}
