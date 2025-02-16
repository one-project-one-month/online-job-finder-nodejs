import prisma from "../src/database/index.js";
import authSeeder from "./seeder/authSeeder.js";
import locationSeeder from "./seeder/location.js";
import roleSeeder from "./seeder/roleSeeder.js";
import skillSeeder from "./seeder/skillSeeder.js";

async function main() {
  await roleSeeder();
  await authSeeder();
  await locationSeeder();
  await skillSeeder();
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
