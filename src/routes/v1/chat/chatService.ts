/*************************************************
 * Chat app - chat api
 * chatService.ts
 * Created by Sarankumar Selvaraj on 30/10/2024
 * Copyright
 *************************************************/

import conversationModel from "../../../model/conversationModel";
import messageModel from "../../../model/messageModel";
import { getReceiverSocketId, io } from "./socket/socketConfig";

// send message api functionality
const onSend_Message = async (params: any, body: any, userId: any) => {
  const { id: receiverId } = params;
  const { message } = body;
  const senderId = userId;
  // find the participants of the conversation
  let conversation = await conversationModel.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  // if the conversation is not created, just create it
  if (!conversation) {
    conversation = await conversationModel.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new messageModel({
    senderId,
    receiverId,
    message,
  });

  // push the message id to the conversation
  conversation.messages.push(newMessage._id);

  const saveToDb = await Promise.all([conversation.save(), newMessage.save()]);
  const receiverSocketId = getReceiverSocketId(receiverId);
  if(receiverId) {
     io.to(receiverSocketId).emit("newMessage", newMessage);
  }
  return saveToDb;
};

// get message api functionality
const onGet_Message = async (params: any, userId: any) => {
   const { id: userToChatId } = params;
   const senderId = userId;
  
   const conversation = conversationModel.findOne({
       participants: { $all: [senderId, userToChatId] }
   }).populate("messages");

   if(!conversation) {
      return [];
   }

   return conversation;
};

export = 
{ 
  onSend_Message, 
  onGet_Message 
};
