/*************************************************
 * Chat app - chat api
 * chatController.ts
 * Created by Sarankumar Selvaraj on 01/11/2024
 * Copyright
 *************************************************/

import { Request, Response } from "express";
import chatService from "./chatService";
import httpStatus from "http-status";
import { errorMessage, successMessage } from "../../../utils/apiMessage";
import { onSend_CatchResponse } from "../../../utils/helper";

const sendMessage = async (req: Request, res: Response) => {
    try {
        const data = await chatService.onSend_Message(req.params, req.body, req.user);
        if(data) {
            res.status(httpStatus.ACCEPTED).send({
                data: data ?? null,
                message: successMessage.success,
                success: true
            });
        }
        else {
            res.status(httpStatus.BAD_REQUEST).send({
                data: null,
                message: errorMessage.badRequest,
                success: false,
            });
        }
    }
    catch(error) {
        console.log(`Error occurred during: ${error}`);
        onSend_CatchResponse(res);
    }
};

const getMessage = async (req: Request, res: Response) => {
    try {
       const data = await chatService.onGet_Message(req.params, req.user);
       if(data) {
         res.status(httpStatus.ACCEPTED).send({
            message: successMessage.success,
            data: data ?? null,
            success: true
         });
       }
       else {
         res.status(httpStatus.NOT_FOUND).send({
            message: errorMessage.dataNotFoundMessage,
            data: null,
            success: false
         });
       }
    }
    catch(error) {
       console.log(`Error occurred during: ${error}`);
       onSend_CatchResponse(res);
    }
};

export = {
    sendMessage,
    getMessage
};