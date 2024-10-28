import app from "./app";
import config from "./config/config";
import logger from "./config/logger";
import onConnect_MongoDb from "./config/mongoClient";
import authModel from "./model/authModel";

let server: any;
logger.info(`Running on server: ${config.env}`);

// event function
(async () => {
  try {
    onConnect_MongoDb().then(async (data) => {
      if (data) {
        onInitiate_Model();
        server = app.listen(config.port, async () => {
          logger.info(`Listen to port ${config.port}`);
        });
      }
    });
  } catch (error) {
    logger.error(error);
  }
})();

const onInitiate_Model = () => {
  authModel;
};

const onExit_Handler = () => {
  if (server) {
    server.close(() => {
      logger.info("server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const onHandle_Error = (error: string) => {
  logger.error(error);
  onExit_Handler();
};

const onHandle_SIGTERM = () => {
  logger.info("sigterm received");
  onExit_Handler();
};

// error handling
process.on("warning", (e) => logger.warn(e.stack));
process.on("uncaughtException", onHandle_Error);
process.on("unhandledRejection", onHandle_Error);
process.on("SIGTERM", onHandle_SIGTERM);
