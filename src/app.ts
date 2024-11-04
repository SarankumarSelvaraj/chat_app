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
import { Request, Response } from "express";
import ApiError from "./utils/apiError";
import httpStatus from "http-status";
import { errorMessage } from "./utils/apiMessage";
import cookieParser from "cookie-parser";
import router from "./routes/v1";


// initiate the app
const app = express();
// helps secure your application by setting various HTTP headers to prevent common security vulnerabilities, such as cross-site scripting (XSS), content security policy (CSP), and more  
app.use(helmet());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.options("*", cors());
app.use("/api/v1", router);
app.use((req: Request, res: Response, next: NextFunction) => {
  return next(new ApiError(httpStatus.NOT_FOUND, errorMessage[404]));
});

export default app;
