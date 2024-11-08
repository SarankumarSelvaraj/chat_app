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

const chatRoutes = express.Router();

chatRoutes.post(
    END_POINTS.chat.sendMessage,
    validateSchema(chatSchema.sendMessage),
    chatController.sendMessage
);

chatRoutes.get(
   END_POINTS.chat.getMessage,
   validateSchema(chatSchema.getMessage),
   chatController.getMessage
);

export default chatRoutes;
