#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";

// eslint-disable-next-line import/order
import dotenv from "dotenv";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config({ path: path.resolve(dirname, "..", "..", ".env") });

// eslint-disable-next-line import/order
import { program } from "commander";
import mongoose from "mongoose";

import { importJsonData } from "./commands/importJsonData";
import { IOptionValues } from "./types/common";
import mongoDbConnection from "../src/services/mongoose/connection";
import { CONNECTION_EVENTS } from "../src/types/mongoose";

const DB_NAME = process.env.MONGO_DATABASE_NAME as string;
const DB_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING as string;

program
  .name("Import Data CLI")
  .version("1.0.0")
  .description("Imports data from JSON file to MongoDB");

program
  .option("-f, --file <path>", "Absolute path to the file to be downloaded");

program.parse(process.argv);

const options = program.opts();

// eslint-disable-next-line no-console
console.log("NAME:", DB_CONNECTION_STRING);
// DB configuration and connection create
mongoDbConnection({
  reconnectInterval : 10000,
  databaseName      : DB_NAME,
  connectionString  : DB_CONNECTION_STRING,
}).connectToMongo();

mongoose.connection.on(CONNECTION_EVENTS.CONNECTED, () => {
  importJsonData(options as IOptionValues);
});
