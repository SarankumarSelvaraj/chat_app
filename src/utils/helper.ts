/*************************************************
 * Chat app - chat api
 * helper.ts
 * Created by Sarankumar Selvaraj on 28/10/2024
 * Copyright
 *************************************************/

import { Response } from "express";
import httpStatus from "http-status";
import ApiError from "./apiError";
import bcrypt from "bcrypt";
import { errorMessage } from "./apiMessage";
import jwt from "jsonwebtoken";

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

export const hashingPassword = async (
  plainPassword: any,
  saltRound: number
) => {
  const genRound = await bcrypt.genSalt(saltRound);
  const hasPassword = await bcrypt.hash(plainPassword, genRound);
  return hasPassword;
};

export const generateTokenAndSetCookie = (userId: any, res: Response) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ userId }, `${secretKey}`, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const resetTokenAndSetCookie = (res: Response) => {
    res.cookie("jwt", "", {maxAge: 0});
};
