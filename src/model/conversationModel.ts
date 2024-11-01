/*************************************************
 * Chat app - chat api
 * conversationModel.ts
 * Created by Sarankumar Selvaraj on 29/10/2024
 * Copyright
 *************************************************/

import mongoose from "mongoose";


const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signup_details"
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signup_details",
        default: []
    }],
}, {timestamps: true});

const conversationModel = mongoose.model("Conversation_Chat", conversationSchema);

export default conversationModel;