import mongoose, { Connection } from "mongoose";

import {
  Car,
  Category,
} from "../../models";
import logger from "../logger";

let db: Connection;
const databaseName = process.env.MONGO_DATABASE_NAME ?? "";

export function getDatabaseConnection(): Connection | undefined {
  try {
    if (!db) {
      db = mongoose.connection.useDb(databaseName);

      //MODELS SETUP
      db.model("cars", Car.schema);
      db.model("categories", Category.schema);

      logger.debug(`The connection to the database '${databaseName}' is successfully established.`);
    }
    return db;
  } catch (error) {
    logger.error(`Error while establishing connection to '${databaseName}' database:\n`, error);
  }
}
