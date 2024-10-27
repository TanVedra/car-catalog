import fs from "node:fs/promises";
import path from "node:path";

import mongoose, { Types } from "mongoose";

import carRepository from "../../src/repositories/car";
import categoryRepository from "../../src/repositories/category";
import { ValidationError } from "../../src/services/errors/errorWrappers";
import logger from "../../src/services/logger";
import { CONNECTION_EVENTS } from "../../src/types/mongoose";
import { jsonFileValidationSchema } from "../schemas/jsonFile";
import { fileValidator } from "../services/fileValidator";
import { IOptionValues } from "../types/common";
import { IJsonFileData } from "../types/jsonFile";

export async function importJsonData(options: IOptionValues): Promise<void> {
  try {
    logger.debug("Starting file upload...");
    const { file } = options;
    const isAbsolute = path.isAbsolute(file);
    const filePath = isAbsolute ? file : path.resolve(process.cwd(), file);
    const dataString = await fs.readFile(path.normalize(filePath), "utf8");
    let dataToSave: IJsonFileData[] = [];

    try {
      dataToSave = JSON.parse(dataString);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ValidationError("File data is not a valid JSON");
    }

    fileValidator(jsonFileValidationSchema, dataToSave);

    const carsToSave: IJsonFileData["cars"] = [];
    const categoriesToSave = dataToSave.map<Omit<IJsonFileData, "cars">>((category) => {
      const categoryId = new Types.ObjectId();

      category.cars.forEach((car) => {
        carsToSave.push({
          categoryId,
          model       : car.model,
          price       : car.price,
          color       : car.color,
          imageUrl    : car.imageUrl,
          description : car.description,
        });
      });

      return {
        _id         : categoryId,
        name        : category.name,
        imageUrl    : category.imageUrl,
        description : category.description,
      };
    });

    await categoryRepository.saveCategories({ payload: categoriesToSave, requestId: "CLI EXECUTION" });
    await carRepository.saveCars({ payload: carsToSave, requestId: "CLI EXECUTION" });
    logger.info("File uploaded");
  } catch (error) {
    logger.error("CLI-ERROR:\n", error);
  } finally {
    mongoose.connection.emit(CONNECTION_EVENTS.STOP);
  }
}
