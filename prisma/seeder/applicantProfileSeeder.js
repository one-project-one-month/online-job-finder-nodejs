import prisma from "../../src/database/index.js";
import { applicants } from "../dummy/applicantProfile.js";

async function applicantProfileSeeder() {
  for (let applicant of applicants) {
    await prisma.applicantProfile.create({
      data: applicant,
    });
  }
}

export default applicantProfileSeeder;
