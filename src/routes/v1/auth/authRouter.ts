import authSchema from "./authSchema";
import authController from "./authController";
import { validateSchema } from "../../../middleware/validate";
import express from "express";
import END_POINTS from "../../../utils/apiUrl";

const authRoutes = express.Router();

authRoutes.post(
    END_POINTS.auth.createUser,
    validateSchema(authSchema.authSchema),
    authController.createUser
);

export default authRoutes;


