/*************************************************
 * Chat app - chat api
 * authService.ts
 * Created by Sarankumar Selvaraj on 28/10/2024
 * Copyright
 *************************************************/

import authModel from "../../../model/authModel";
import {
  generateTokenAndSetCookie,
  hashingPassword,
  resetTokenAndSetCookie,
} from "../../../utils/helper";
import bcrypt from "bcrypt";
import { Response } from "express";

// signup method
const onCreate_Users = async (body: any, res: Response) => {
  // default profile picture for male and female
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${body.userName}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${body.userName}`;

  const isUserAlreadyExist = await authModel.findOne({
    userName: body.userName,
  });
  if (isUserAlreadyExist) {
    throw new Error(
      "Username is already exists, please give different user id"
    );
  }
  // check whether both the password and confirm password match validation
  if (body.password !== body.confirmPassword) {
    throw new Error("Both password and confirm password should match");
  }
  // hash the password using bcrpt package
  const saltRound = 10;
  const hashPassword = {
    ...body,
    password: await hashingPassword(body.password, saltRound),
    profilePic: body.gender === "male" ? boyProfilePic : girlProfilePic,
  };
  const signupUser = new authModel(hashPassword);

  if (signupUser) {
    generateTokenAndSetCookie(signupUser._id, res);
    const saveUsers = await signupUser.save();
    return saveUsers;
  }

  if (!signupUser) {
    throw new Error("Invalid input");
  }
};

//login method
const onLogin_User = async (body: any, res: any) => {
  const user = await authModel.findOne({ userName: body.userName });
  const isPasswordCorrect = await bcrypt.compare(
    body.password,
    user?.password || ""
  );

  // check whether both email and password should correct or not, if not this will execute
  if (!user || !isPasswordCorrect) {
    throw new Error("Incorrect username or password");
  }
  // login success it will generate the token and set the token in the cookie
  generateTokenAndSetCookie(user._id, res);
  return user;
};

// logout method
const onLogout_User = (res: any) => {
     resetTokenAndSetCookie(res);
};

// get user for sidebar
const onGet_Users = async (userId: any) => {
  console.log(`User id: ${userId}`);
   // filter the user list based on who login, that login user data shouldn't display and also data of the user which field should list.
   const filteredUsers = await authModel.find({ _id: { $ne: userId } }).select("-password").select("-confirmPassword");
   console.log(`Filtered Users: ${filteredUsers}`);
   return filteredUsers;
};

export = {
  onCreate_Users,
  onLogin_User,
  onLogout_User,
  onGet_Users
};
