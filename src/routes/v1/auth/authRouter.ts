/*************************************************
 * Chat app - chat api
 * authRouter.ts
 * Created by Sarankumar Selvaraj on 28/10/2024
 * Copyright
 *************************************************/

import authSchema from "./authSchema";
import authController from "./authController";
import { validateSchema } from "../../../middleware/validate";
import express from "express";
import END_POINTS from "../../../utils/apiUrl";

const authRoutes = express.Router();

authRoutes.post(
    END_POINTS.auth.createUser,
    validateSchema(authSchema.createUser),
    authController.createUser
);

authRoutes.post(
    END_POINTS.auth.login,
    validateSchema(authSchema.login),
    authController.login
);

authRoutes.post(
  END_POINTS.auth.logOut,
  authController.logOut
);

export default authRoutes;


