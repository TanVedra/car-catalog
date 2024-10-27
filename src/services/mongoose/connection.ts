import mongoose from "mongoose";

import { IConnectionOptions, IConnection, CONNECTION_EVENTS } from "../../types/mongoose";
import logger from "../logger";

export default function connection(options: IConnectionOptions): IConnection {
  function connectToMongo(): void {
    mongoose
      .connect(options.connectionString)
      .catch((error) => {
        logger.error("UNEXPECTED MongoDB CONNECTION ERROR:\n", error);
        process.exit(1);
      });
  }

  mongoose.connection.on(CONNECTION_EVENTS.STOP, () => {
    logger.debug("Stopping MongoDb connection...");
    mongoose.connection.removeAllListeners();
    mongoose.disconnect();
  });

  mongoose.connection.on(CONNECTION_EVENTS.CONNECTED, () => {
    logger.debug("Connected to MongoDB!");
  });

  mongoose.connection.on(CONNECTION_EVENTS.RECONNECTED, () => {
    logger.debug("MongoDB reconnected!");
  });

  mongoose.connection.on(CONNECTION_EVENTS.DISCONNECTED, () => {
    logger.warn(
      `MongoDB disconnected! Reconnecting in ${
        options.reconnectInterval / 1000
      }s...`,
    );
    setTimeout(connectToMongo, options.reconnectInterval);
  });

  mongoose.connection.on(CONNECTION_EVENTS.ERROR, (error) => {
    logger.error(`Error in MongoDb connection: ${error}`);
    mongoose.disconnect();
  });

  return {
    connectToMongo,
  };
}
