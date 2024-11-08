/*************************************************
 * Chat app - chat api
 * authSchema.ts
 * Created by Sarankumar Selvaraj on 28/10/2024
 * Copyright
 *************************************************/

import Joi from "joi";

const createUser = {
    body: Joi.object().keys({
        fullName: Joi.string(),
        userName: Joi.string().email(),
        password: Joi.string().min(8),
        confirmPassword: Joi.string().min(8),
        gender: Joi.string()
    }),
};

const login = {
    body: Joi.object().keys({
        userName: Joi.string().email(),
        password: Joi.string().min(8)
    }),
};

const getUsers = {
  params: Joi.object().keys({
     id: Joi.string()
  })
}

export = {createUser, login, getUsers};
