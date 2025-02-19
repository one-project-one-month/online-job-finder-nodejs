import { locations } from "../dummy/location.js";
import prisma from "../../src/database/index.js";

async function locationSeeder() {
  for (let location of locations) {
    await prisma.location.create({
      data: location,
    });
  }
}

export default locationSeeder;
