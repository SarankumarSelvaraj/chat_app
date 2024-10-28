import { Response } from "express";
import httpStatus from "http-status";
import ApiError from "./apiError";
import bcrypt from "bcrypt";
import { errorMessage } from "./apiMessage";

export const onSend_CatchResponse = (res: Response) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: errorMessage.somethingWentWrong,
        success: false,
        data: new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            errorMessage.somethingWentWrong
        ),
    });
};

export const hashingPassword = async(plainPassword: any, saltRound: number) => {
    const genRound = await bcrypt.genSalt(saltRound);
    const hasPassword = await bcrypt.hash(plainPassword, genRound);
    return hasPassword;    
};
