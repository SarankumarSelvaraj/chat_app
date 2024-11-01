/*************************************************
 * Chat app - chat api
 * apiUrl.ts
 * Created by Sarankumar Selvaraj on 28/10/2024
 * Copyright
 *************************************************/

const END_POINTS = {
    auth: {
        createUser: "/createUser",
        login: "/login",
        logOut: "/logOut"
    },
    chat: {
        sendMessage: "/sendMessage",
        getMessage: "/getMessage"
    }
};

export default END_POINTS;