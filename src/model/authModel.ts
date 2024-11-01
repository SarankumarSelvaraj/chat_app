/*************************************************
 * Chat app - chat api
 * authModel.ts
 * Created by Sarankumar Selvaraj on 28/10/2024
 * Copyright
 *************************************************/

import mongoose from "mongoose";
import { GENDER } from "../utils/constant";


const authSchema = new mongoose.Schema({
    fullName: String,
    userName: String,
    password: String,
    confirmPassword: String,
    gender: {
        trim: true,
        type: String,
        enum: Object.values(GENDER)
    },
    profilePic: {
        type: String,
        default: ""
    },
}, {timestamps: true});

const authModel = mongoose.model("Signup_details", authSchema);

export default authModel;