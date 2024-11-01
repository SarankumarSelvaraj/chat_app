/*************************************************
 * Chat app - chat api
 * chatService.ts
 * Created by Sarankumar Selvaraj on 30/10/2024
 * Copyright
 *************************************************/

import conversationModel from "../../../model/conversationModel";
import messageModel from "../../../model/messageModel";

// send message api functionality
const onSend_Message = async (params: any, body: any, user: any) => {
  const { id: receiverId } = params;
  const { message } = body;
  const senderId = user.userId;

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
  return saveToDb;
};

const onGet_Message = async (params: any, user: any) => {
   const { id: userToChatId } = params;
   const senderId = user.userId;

   const conversation = conversationModel.findOne({
       participants: { $all: [senderId, userToChatId] }
   }).populate("messages");

   if(!conversation) {
      return [];
   }

   return conversation;
};

export { onSend_Message, onGet_Message };
