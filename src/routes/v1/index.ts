/*************************************************
 * Chat app - chat api for router
 * index.ts
 * Created by Sarankumar Selvaraj on 04/11/2024
 * Copyright
 *************************************************/

import express from "express";
import authRoutes from "./auth/authRouter";
import chatRoutes from "./chat/chatRouter";
import  { protectedRoute } from "../../middleware/protectedRoute";

const router = express.Router();

const defaultRoutes = [
    {
        path: "/auth",
        route: authRoutes,
        protected: false
    },
    {
        path: "/chat",
        route: chatRoutes,
        protected: true
    }
];

defaultRoutes.forEach((route) => {
    if(route.protected) {
       router.use(route.path, protectedRoute, route.route);
    }
    else {
        router.use(route.path, route.route);
    }
});

export default router;
