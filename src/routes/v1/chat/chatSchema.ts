/*************************************************
 * Chat app - chat api
 * chatSchema.ts
 * Created by Sarankumar Selvaraj on 01/11/2024
 * Copyright
 *************************************************/

import Joi from "joi";

const sendMessage = {
   body: Joi.object().keys({
      message: String
   })
};

const getMessage = {
    params: Joi.object().keys({
        id: String
    })
};

export = {
    sendMessage,
    getMessage
};