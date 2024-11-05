/*************************************************
 * Chat app - chat api
 * chatSchema.ts
 * Created by Sarankumar Selvaraj on 01/11/2024
 * Copyright
 *************************************************/

import Joi from "joi";

const sendMessage = Joi.object({
    receiverId: Joi.string().required(),
    message: Joi.string()
})

const getMessage = {
    params: Joi.object().keys({
        id: String
    })
};

export = {
    sendMessage,
    getMessage
};
