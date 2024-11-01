/*************************************************
 * Chat app - chat api
 * chatRouter.ts
 * Created by Sarankumar Selvaraj on 01/11/2024
 * Copyright
 *************************************************/

import express from "express";
import END_POINTS from "../../../utils/apiUrl";
import { validateSchema } from "../../../middleware/validate";
import chatSchema from "./chatSchema";
import chatController from "./chatController";
import protectedRoute from "../../../middleware/protectedRoute";

const router = express.Router();

router.post(
    END_POINTS.chat.sendMessage,
    validateSchema(chatSchema.sendMessage),
    chatController.sendMessage
);

router.get(
   END_POINTS.chat.getMessage,
   validateSchema(chatSchema.getMessage),
   chatController.getMessage
);

export default router;