import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { connectDatabase } from "./database/index.js";
import authRouter from "./features/auth/auth.router.js";

//db connection
connectDatabase();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);

export default app;
