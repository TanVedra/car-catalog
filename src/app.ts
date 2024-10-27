import "dotenv/config";

import cluster from "node:cluster";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import bodyParser from "body-parser";
import express from "express";
import { engine } from "express-handlebars";

import CONSTANTS from "./constants/common";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import registerAllRoutes from "./routes";
import CustomHelpers from "./services/handlebars";
import logger from "./services/logger";
import mongoDbConnection from "./services/mongoose/connection";

if (process.env.RUN_IN_PARALEL === "true" && cluster.isPrimary) {
  for (let i = 0; i < os.availableParallelism(); i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const DB_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING as string;
  const PORT: number = Number(process.env.PORT) || CONSTANTS.EXPRESS.DEFAULT_PORT;

  // DB configuration and connection create
  mongoDbConnection({
    reconnectInterval : 10000,
    connectionString  : DB_CONNECTION_STRING,
  }).connectToMongo();

  // Register Handlebars engine
  app.engine("hbs", engine({
    extname        : "hbs",
    runtimeOptions : {
      allowProtoPropertiesByDefault: true,
    },
  }));
  app.set("view engine", "hbs");
  app.set("views", path.join(dirname, "..", "..", "views"));

  // Initialize custom handlebars helpers
  CustomHelpers.init();

  // Parses URL-encoded bodies (as sent by HTML forms)
  app.use(bodyParser.urlencoded({ extended: false }));

  // Initialize static folder
  app.use(express.static(path.join(dirname, "..", "..", "public")));

  app.use(loggerMiddleware);

  // Connect all routes to the application
  registerAllRoutes(app);

  app.use(errorHandlingMiddleware);

  const server = app.listen(PORT, () => {
    const addressInfo = server.address();

    if (typeof addressInfo === "object" && addressInfo) {
      const port = addressInfo.port;
      const host = addressInfo.address === "::" ? "localhost" : addressInfo.address;
      logger.info(`Server has been started at http://${host}:${port}`);
    }
  });
}

