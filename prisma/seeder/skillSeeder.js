import prisma from "../../src/database/index.js";
import { skills } from "../dummy/skill.js";

async function skillSeeder() {
  for (let skill of skills) {
    await prisma.skill.create({
      data: skill,
    });
  }
}

export default skillSeeder;
