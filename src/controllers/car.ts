import { Request, Response, NextFunction } from "express";

import carRepository from "../repositories/car";
import logger from "../services/logger";

export default class CarController {

  public static async getCarById (req: Request, res: Response, next: NextFunction): Promise<void> {
    const requestId = req.requestId;
    try {
      const { categoryId, carId } = req.params;
      logger.debug(`[ID=${requestId}]: Inside ${CarController.getCarById.name} controller`);
      const car = await carRepository.getCarById({ requestId, payload: { carId } });

      logger.debug(`[ID=${requestId}]: Sending response from ${CarController.getCarById.name} controller`);
      res.render("car", {
        carId,
        categoryId,
        isCarPage    : true,
        car          : car.data,
        title        : "Car Details",
        carModel     : car.data.model,
        categoryName : car.data.category?.name,
      });
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error while obtain car by ID in ${CarController.getCarById.name} controller`);
      next(error);
    }
  }
}
