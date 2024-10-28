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
    }
});

const authModel = mongoose.model("Signup_details", authSchema);

export default authModel;