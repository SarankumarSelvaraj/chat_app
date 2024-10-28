import Joi from "joi";
import * as path from "path";
import dotenv from "dotenv";
import { SERVER_TYPE } from "../utils/constant";

dotenv.config({ path: path.join(__dirname, "../../.env")});

const schema = Joi.object().keys({
     PORT: Joi.number().default(8000),
     NODE_ENV: Joi.string()
     .valid(
        SERVER_TYPE.dev,
        SERVER_TYPE.prod,
        SERVER_TYPE.stage
     ).required(),

    MONGODB_CONNECTION_STRING: Joi.string().required(),
}).unknown();

const { value, error } = schema.prefs({errors: {label: "key"}}).validate(process.env);

if(error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export = {
  port: value.PORT,
  env: value.NODE_ENV,
  mongodb_connection_string: value.MONGODB_CONNECTION_STRING,
};