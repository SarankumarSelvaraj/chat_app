/*************************************************
 * Chat app - chat api
 * messageModel.ts
 * Created by Sarankumar Selvaraj on 29/10/2024
 * Copyright
 *************************************************/

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signup_details",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signup_details",
        required: true
    },
    message: String
}, {timestamps: true});

const messageModel = mongoose.model("Message_Chat", messageSchema);

export default messageModel;