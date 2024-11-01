/*************************************************
 * Chat app - chat api
 * protectedRoute.ts
 * Created by Sarankumar Selvaraj on 01/11/2024
 * Copyright
 *************************************************/

import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { onSend_CatchResponse } from "../utils/helper";
import httpStatus from "http-status";
import authModel from "../model/authModel";

const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
    try{
       const token = req.cookies.jwt;
       if(!token) {
          return res.status(httpStatus.UNAUTHORIZED).json({
              error: "Unauthorized - no token provided"
          });
       }
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
      if(!decoded) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            error: "Unauthorized - invalid Token"
        });
      }
      // in this line, decoded the user data except the password 
      const user = await authModel.findById(decoded).select("-password"); 
    }
    catch(error) {
       console.log(`Error in protected route: ${error}`);
       onSend_CatchResponse(res);
    }
};

export default protectedRoute;