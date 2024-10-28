import { Request, Response } from "express";
import Joi from "joi";
import httpStatus from "http-status";
import ApiError from "../utils/apiError";

const pick = (object: any, keys: any) => {
  return keys.reduce((obj: any, key: any) => {
    if (object && Object.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

const validateSchema = (schema: any) => (req: Request, res: Response, next: any) => {
    const fields: Array<string> = ["params", "query", "body"];
    const validSchema = pick(schema, fields);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
    .prefs({errors: { label: "key" }, abortEarly: false})
    .validate(object);
    
    if(error) {
      const errorMessage = error.details.map((details: any) => details.message).join(", ");
      res.status(httpStatus.BAD_REQUEST).send({
         message: errorMessage,
         success: false,
         data: null,
      });

      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);

    return next();
}

export { validateSchema };
