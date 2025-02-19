import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { connectDatabase } from "./database/index.js";
import authRouter from "./features/auth/auth.router.js";
import locationRouter from "./features/locations/location.route.js";
import skillRouter from "./features/skills/skill.route.js";
import jobCategoryRouter from "./features/job_category/job_category.router.js";
import jobRouter from "./features/job/job.router.js";
import route from "./router/default.js";

//db connection
connectDatabase();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

//routes
app.use("/api", route);

export default app;
