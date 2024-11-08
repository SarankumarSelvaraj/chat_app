/*************************************************
 * Chat app - chat api
 * protectedRoute.ts
 * Created by Sarankumar Selvaraj on 01/11/2024
 * Copyright
 *************************************************/


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../@types/userAuth";

// JWT authentication middleware
export const protectedRoute = (req: Request, res: Response, next: NextFunction): void => {
  // Define your secret key. In a real application, store this in environment variables.
  const secretKey = process.env.JWT_SECRET || ""; // Replace with your actual secret key
  // Get the token from the cookies
  const token = req.cookies.jwt; // Assuming the cookie is named 'jwt'
  if (token) {
    // Verify the token
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) {
        // Token is invalid
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      console.log(`Verify the data ${JSON.stringify(decoded)}`);
      // Token is valid, attach user info to the request
      req.user = decoded as UserPayload;
      next();
    });
  } else {
    console.log(`Error in token: ${token}`);
    // No token found
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};
