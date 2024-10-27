import { Request, Response, NextFunction } from "express";

import carRepository from "../repositories/car";
import categoryRepository from "../repositories/category";
import logger from "../services/logger";

export default class AdminController {

  public static redirectToLoginPage (req: Request, res: Response, next: NextFunction): void {
    const requestId = req.requestId;
    try {
      logger.debug(`[ID=${requestId}]: Inside ${AdminController.redirectToLoginPage.name} controller`);

      res.redirect("/admin/login");
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error while obtain login page in ${AdminController.redirectToLoginPage.name} controller`);
      next(error);
    }
  }

  public static getLoginPage (req: Request, res: Response, next: NextFunction): void {
    const requestId = req.requestId;
    try {
      logger.debug(`[ID=${requestId}]: Inside ${AdminController.getLoginPage.name} controller`);

      logger.debug(`[ID=${requestId}]: Sending response from ${AdminController.getLoginPage.name} controller`);
      res.render("pages/admin/login", {
        isLoginPage : true,
        layout      : "admin",
      });
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error while obtain login page in ${AdminController.getLoginPage.name} controller`);
      next(error);
    }
  }

  public static authorizeUser (req: Request, res: Response, next: NextFunction): void {
    const requestId = req.requestId;
    try {
      logger.debug(`[ID=${requestId}]: Inside ${AdminController.authorizeUser.name} controller`);
      const { username, password } = req.body;
      logger.debug(`[ID=${requestId}]: Sending response from ${AdminController.authorizeUser.name} controller`);
      // Simulation
      if (username && password) {
        res.redirect("/admin/cars");
      } else {
        res.redirect("/admin/login");
      }
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error while authorize user in ${AdminController.authorizeUser.name} controller`);
      next(error);
    }
  }

  public static async getEditCarsPage (req: Request, res: Response, next: NextFunction): Promise<void> {
    const requestId = req.requestId;
    try {
      logger.debug(`[ID=${requestId}]: Inside ${AdminController.getEditCarsPage.name} controller`);
      const [{ data: cars }, { data: categories }] = await Promise.all([
        carRepository.getCarsList({ requestId }),
        categoryRepository.getCategoryDropdownList({ requestId }),
      ]);
      logger.debug(`[ID=${requestId}]: Sending response from ${AdminController.getEditCarsPage.name} controller`);
      res.render("pages/admin/carList", {
        cars,
        categories,
        isCarListPage : true,
        layout        : "admin",
        title         : "Admin Panel (Edit Cars)",
      });
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error while obtain edit cars page in ${AdminController.getEditCarsPage.name} controller`);
      next(error);
    }
  }

  public static async updateCarById (req: Request, res: Response, next: NextFunction): Promise<void> {
    const requestId = req.requestId;
    try {
      logger.debug(`[ID=${requestId}]: Inside ${AdminController.updateCarById.name} controller`);
      const { carId } = req.params;
      await carRepository.updateCarById({ requestId, payload: { _id: carId, ...req.body } });

      logger.debug(`[ID=${requestId}]: Sending response from ${AdminController.updateCarById.name} controller`);
      res.redirect("/admin/cars");
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error while update car by ID in ${AdminController.updateCarById.name} controller`);
      next(error);
    }
  }
}
