process.on("uncaughtException", (error) => {
  console.log(error.name, error.message);
  console.log("❌ UNCAUGHT EXCEPTION ! Shutting down ...");
  process.exit(0);
});

import dotenv from "dotenv";
import app from "./app.js";
import { PORT, HOST } from "./configs.js";

dotenv.config();

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}!`);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  console.log("❌ UNHANDLED REJECTION ! Shutting down ...");
  process.exit(() => server.close());
});
