import { Request, Response, NextFunction } from "express";

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

  public static loginUser (req: Request, res: Response, next: NextFunction): void {
    const requestId = req.requestId;
    try {
      logger.debug(`[ID=${requestId}]: Inside ${AdminController.loginUser.name} controller`);

      logger.debug(`[ID=${requestId}]: Sending response from ${AdminController.loginUser.name} controller`);
      res.render("pages/admin/login", {
        isLoginPage : true,
        layout      : "admin",
      });
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error while obtain login in ${AdminController.loginUser.name} controller`);
      next(error);
    }
  }
}
