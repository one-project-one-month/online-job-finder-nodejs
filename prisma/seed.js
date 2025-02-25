import prisma from "../src/database/index.js";
import authSeeder from "./seeder/authSeeder.js";
import jobCategoriesSeeder from "./seeder/jobCategorySeeder.js";
import locationSeeder from "./seeder/location.js";
import roleSeeder from "./seeder/roleSeeder.js";
import skillSeeder from "./seeder/skillSeeder.js";

async function main() {
  await roleSeeder();
  await authSeeder();
  await locationSeeder();
  await skillSeeder();
  await jobCategoriesSeeder();
<<<<<<< HEAD
<<<<<<< HEAD
=======
  //await companyProfileSeeder();
>>>>>>> a107096add5e70b6a84edd8623bf490de7a17b4c
=======

>>>>>>> 67073bac3e9648509c07bc47bb7900ce55fe6e4a
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
