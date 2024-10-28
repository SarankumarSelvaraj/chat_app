import mongoose from "mongoose"
import config from "./config";
import logger from "./logger";

const onConnect_MongoDb = async () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.mongodb_connection_string)
        .then(() => {
            resolve(true);
            logger.info("mongodb connect");
        })
        .catch((error) => {
            logger.info(`mongodb error: ${error}`);
            reject(error);
            process.exit(1);
        })
    });
};

export default onConnect_MongoDb;