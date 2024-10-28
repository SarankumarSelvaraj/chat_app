import Joi from "joi";

const authSchema = {
    body: Joi.object().keys({
        fullName: Joi.string(),
        userName: Joi.string(),
        password: Joi.string(),
        confirmPassword: Joi.string(),
        gender: Joi.string()
    }),
};

export = {authSchema};