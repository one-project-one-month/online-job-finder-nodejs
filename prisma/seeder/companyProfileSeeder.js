import prisma from "../../src/database/index.js";
import { companies } from "../dummy/companyProfile.js";

async function companyProfileSeeder() {
  for (let companie of companies) {
    await prisma.companyProfile.create({
      data: companie,
    });
  }
}

export default companyProfileSeeder;
