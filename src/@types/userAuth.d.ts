
import { Request } from "express";

interface UserPayload {
    id: string;
    username: string;
    userId: string;
}

// Extend the express Request interface
declare module "express-serve-static-core" {
    interface Request {
        user?: UserPayload;
    }
}