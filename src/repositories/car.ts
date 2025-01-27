import { Connection, Model, Types } from "mongoose";

import { NotFoundError } from "../services/errors/errorWrappers";
import logger from "../services/logger";
import { getDatabaseConnection } from "../services/mongoose";
import { ICarSchema } from "../types/car";
import { IBaseRequest, IBaseResponse } from "../types/common";

class CarRepository {
  private carCollection: Model<ICarSchema>;

  constructor(dbConnection: Connection) {
    this.carCollection = dbConnection.models.cars;
  }

  public async getCarById(
    data: IBaseRequest<{ carId: string }>,
  ): Promise<IBaseResponse<ICarSchema>> {
    const {
      requestId,
    } = data;

    try {
      const { carId } = data.payload;

      logger.debug(`[ID=${requestId}]: Inside ${this.getCarById.name} repository`);
      const car = await this.carCollection.findOne(
        { _id: new Types.ObjectId(carId) },
        { updatedAt: 0, createdAt: 0 },
      )
        .populate({
          select : "name",
          path   : "category",
        })
        .lean()
        .exec();

      if (!car) {
        throw new NotFoundError("Car with specified ID not found");
      }
      car.category = (car.category as unknown as ICarSchema["category"][])[0];
      logger.debug(`[ID=${requestId}]: Sending response from ${this.getCarById.name} repository`);

      return {
        data: car,
      };
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error occured while getting car by ID data in ${this.getCarById.name} repository`);
      throw error;
    }
  }

  public async saveCars(
    data: IBaseRequest<ICarSchema[]>,
  ): Promise<IBaseResponse<ICarSchema[]>> {
    const {
      requestId,
    } = data;
    try {
      logger.debug(`[ID=${requestId}]: Inside ${this.saveCars.name} repository`);

      const carsToSave = data.payload;

      if (!carsToSave?.length) {
        logger.debug(`[ID=${requestId}]: There are no cars to save.`);

        return {
          data: [],
        };
      }

      const cars = await this.carCollection.insertMany(data.payload);

      logger.debug(`[ID=${requestId}]: Sending response from ${this.saveCars.name} repository`);

      return {
        data: cars,
      };
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error occured while saving cars in ${this.saveCars.name} repository`);
      throw error;
    }
  }

  public async updateCarById(
    data: IBaseRequest<ICarSchema>,
  ): Promise<IBaseResponse<ICarSchema>> {
    const {
      requestId,
    } = data;
    try {
      logger.debug(`[ID=${requestId}]: Inside ${this.updateCarById.name} repository`);
      const car = data.payload;

      const updatedCar = await this.carCollection.findByIdAndUpdate(new Types.ObjectId(car._id), car);

      logger.debug(`[ID=${requestId}]: Sending response from ${this.updateCarById.name} repository`);

      return {
        data: updatedCar,
      };
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error occured while update car by ID in ${this.updateCarById.name} repository`);
      throw error;
    }
  }

  public async getCarsList(
    data: IBaseRequest<null>,
  ): Promise<IBaseResponse<ICarSchema[]>> {
    const {
      requestId,
    } = data;
    try {
      logger.debug(`[ID=${requestId}]: Inside ${this.getCarsList.name} repository`);

      const cars = await this.carCollection
        .find({}, { updatedAt: 0, createdAt: 0 })
        .sort({ model: 1 })
        .populate({
          select : "name",
          path   : "category",
        })
        .lean()
        .exec();

      cars.forEach((car) => {
        car.category = (car.category as unknown as ICarSchema["category"][])[0];
      });

      logger.debug(`[ID=${requestId}]: Sending response from ${this.getCarsList.name} repository`);

      return {
        data: cars,
      };
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error occured while getting cars list in ${this.getCarsList.name} repository`);
      throw error;
    }
  }
}

export default new CarRepository(getDatabaseConnection() as Connection);
