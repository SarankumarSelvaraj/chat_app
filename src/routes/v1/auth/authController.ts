/*************************************************
 * Chat app - chat api
 * authController.ts
 * Created by Sarankumar Selvaraj on 28/10/2024
 * Copyright
 *************************************************/

import { Request, Response } from "express";
import { onSend_CatchResponse } from "../../../utils/helper";
import authService from "./authService";
import httpStatus from "http-status";
import { errorMessage, successMessage } from "../../../utils/apiMessage";

const createUser = async (req: Request, res: Response) => {
  try {
    const data = await authService.onCreate_Users(req.body, res);
    if (data) {
      res.status(httpStatus.CREATED).send({
        data: data ?? null,
        message: successMessage.success,
        success: true,
      });
    } else {
      res.status(httpStatus.BAD_REQUEST).send({
        data: null,
        message: errorMessage.badRequest,
        success: false,
      });
    }
  } catch (error) {
    console.error(`Error occurred during at ${error}`);
    onSend_CatchResponse(res);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const data = await authService.onLogin_User(req.body, res) ?? null;
    if (data) {
      res.status(httpStatus.ACCEPTED).send({
        data: data,
        message: successMessage.success,
        success: true,
      });
    } else {
      res.status(httpStatus.BAD_REQUEST).send({
        data: null,
        message: errorMessage.badRequest,
        success: false,
      });
    }
  } catch (error) {
    console.log(`Error occuring during: ${error}`);
    onSend_CatchResponse(res);
  }
};

const logOut = async (req: Request, res: Response) => {
   try {
       await authService.onLogout_User(res) ?? null;
        res.status(httpStatus.ACCEPTED).send({
           message: successMessage.logOutSuccess,
           success: true
        });
   }
   catch(error) {
     console.log(`Error occurring during: ${error}`);
     onSend_CatchResponse(res);
   }
};

const getUsers = async (req: Request, res: Response) => {
   try {
    // const { userId } = req.user ?? {};
    // console.log(`Request user id: ${userId}`);
    const data = await authService.onGet_Users(req.user?.userId);
    if(data) {
      res.status(httpStatus.ACCEPTED).send({
         message: successMessage.success,
         data: data,
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
     console.log(`Errror occurred during: ${error}`);
     onSend_CatchResponse(res);
   }
};

export = {
  createUser,
  login,
  logOut,
  getUsers
};
