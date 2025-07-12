import mongoose from "mongoose";
import { Roles as RoleEnum } from "../consts/roles.enum.js";  
import Roles from "../models/roles.model.js";

const roles = [
  {
    name: RoleEnum.ADMIN,
    description: "Rol con todos los permisos",
    Permissions: [
      "project:create",
      "project:read",
      "project:update",
      "project:delete",
      "issue:create",
      "issue:read",
      "issue:update",
      "issue:delete",
      "user:read_all",
      "user:manage_roles",
    ],
  },
  {
    name: RoleEnum.CREATOR,
    description: "creador de proyectos",
    Permissions: [
      "project:create",
      "project:read",
      "project:update",
      "issue:create",
      "issue:read",
      "issue:update",
    ],
  },
  {
    name: RoleEnum.USER,
    description: "Usuario regular",
    Permissions: ["project:read", "issue:read"],
  },
];

export async function seedRoles() {
    try {
        for (const role of roles) {
            const exists = await Roles.findOne({name: role.name});
            if (!exists) {
                await Roles.create(role);
                console.log(`rol ${role.name} creado`)
            } else {
                console.log(`rol ${role.name} ya existe`)
            }
        }
    } catch (err) {
        console.error("error al sembrar roles", err.message)
    }
}