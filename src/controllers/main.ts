import { Request, Response, NextFunction } from "express";

import carRepository from "../repositories/car";
import categoryRepository from "../repositories/category";
import logger from "../services/logger";

export default class MainController {

  public static async getHomePage (req: Request, res: Response, next: NextFunction): Promise<void> {
    const requestId = req.requestId;
    try {
      logger.debug(`[ID=${requestId}]: Inside ${MainController.getHomePage.name} controller`);
      const { data: { payload: categories } } = await categoryRepository.getCategoryDetailsList({ requestId });

      logger.debug(`[ID=${requestId}]: Sending response from ${MainController.getHomePage.name} controller`);
      res.render("pages/main/home", {
        categories,
        isHomePage : true,
        title      : "Category List",
      });
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error while preparing home page in ${MainController.getHomePage.name} controller`);
      next(error);
    }
  }

  public static async getCategoryPage (req: Request, res: Response, next: NextFunction): Promise<void> {
    const requestId = req.requestId;
    try {
      const { categoryId } = req.params;
      logger.debug(`[ID=${requestId}]: Inside ${MainController.getCategoryPage.name} controller`);
      const { data: category } = await categoryRepository.getCategoryById({ requestId, payload: { categoryId } });

      logger.debug(`[ID=${requestId}]: Sending response from ${MainController.getCategoryPage.name} controller`);
      res.render("pages/main/category", {
        category,
        isCategoryPage : true,
        categoryId     : category._id,
        categoryName   : category.name,
        title          : "Category Details",
      });
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error while preparing category page in ${MainController.getCategoryPage.name} controller`);
      next(error);
    }
  }

  public static async getCarPage (req: Request, res: Response, next: NextFunction): Promise<void> {
    const requestId = req.requestId;
    try {
      const { categoryId, carId } = req.params;
      logger.debug(`[ID=${requestId}]: Inside ${MainController.getCarPage.name} controller`);
      const { data: car } = await carRepository.getCarById({ requestId, payload: { carId } });

      logger.debug(`[ID=${requestId}]: Sending response from ${MainController.getCarPage.name} controller`);
      res.render("pages/main/car", {
        car,
        carId,
        categoryId,
        isCarPage    : true,
        title        : "Car Details",
        carModel     : car.model,
        categoryName : car.category?.name,
      });
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error while preparing car page in ${MainController.getCarPage.name} controller`);
      next(error);
    }
  }
}
