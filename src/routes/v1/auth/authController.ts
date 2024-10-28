import { Request, Response } from "express"
import { onSend_CatchResponse } from "../../../utils/helper"
import authService from "./authService"
import httpStatus from "http-status";
import { errorMessage, successMessage } from "../../../utils/apiMessage";

const createUser = async (req: Request, res: Response) => {
    try {
      const data = await authService.onCreate_Users(req.body);
      if(data) {
        res.status(httpStatus.CREATED).send({
            data: data ?? null,
            message: successMessage.success,
            success: true
        });
      }
      else {
        res.status(httpStatus.BAD_REQUEST).send({
            data: null,
            message: errorMessage.badRequest,
            success: false
        })
      }
    }
    catch(error) {
        console.error(`Error occurred during at ${error}`)
        onSend_CatchResponse(res);
    }
};

export = {
    createUser
};