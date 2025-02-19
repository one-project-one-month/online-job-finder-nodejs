import prisma from "../../src/database/index.js";
import { jobCategories } from "../dummy/job_category.js";

async function jobCategoriesSeeder() {
  for (let jobCategorie of jobCategories) {
    await prisma.jobCategory.create({
      data: jobCategorie,
    });
  }
}

export default jobCategoriesSeeder;
