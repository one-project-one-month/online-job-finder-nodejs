import { roles } from "../dummy/roles.js";
import prisma from "../../src/database/index.js";

async function roleSeeder() {
  for (let role of roles) {
    await prisma.role.create({
      data: role,
    });
  }
}

export default roleSeeder;
