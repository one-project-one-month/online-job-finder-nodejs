import { auths } from "../dummy/auth.js";
import prisma from "../../src/database/index.js";

async function authSeeder() {
  for (let auth of auths) {
    await prisma.user.create({
      data: auth,
    });
  }
}

export default authSeeder;
