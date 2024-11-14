/*************************************************
 * Chat app - chat api
 * socketConfig.ts
 * Created by Sarankumar Selvaraj on 11/11/2024
 * Copyright
 *************************************************/

import express from "express";
import http from "http";
import { Server } from "socket.io";
import logger from "../../../../config/logger";
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
   cors: {
      origin: "*",
      methods: ["GET", "POST"],
   },  
});
const userSocketMap: any = {};

export const getReceiverSocketId = (receiverId: any) => {
  return userSocketMap[receiverId];   
};

io.on("connection", (socket) => {
    logger.info("Socket connected", socket.id);
    const userId: any = socket.handshake.query.userId;
    if(userId !== "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
       logger.info("Socket disconnect", socket.id);
       delete userSocketMap[userId];
       io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
