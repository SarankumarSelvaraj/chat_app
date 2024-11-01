/*************************************************
 * Chat app - chat api
 * app.ts
 * Created by Sarankumar Selvaraj on 28/10/2024
 * Copyright
 *************************************************/

import express, { NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import authRoutes from "./routes/v1/auth/authRouter";
import { Request, Response } from "express";
import ApiError from "./utils/apiError";
import httpStatus from "http-status";
import { errorMessage } from "./utils/apiMessage";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.options("*", cors());
app.use("/api/auth", authRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  return next(new ApiError(httpStatus.NOT_FOUND, errorMessage[404]));
});

export default app;
