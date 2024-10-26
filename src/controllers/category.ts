import { Request, Response, NextFunction } from "express";

import categoryRepository from "../repositories/category";
import logger from "../services/logger";

export default class CategoryController {

  public static async getCategoryList (req: Request, res: Response, next: NextFunction): Promise<void> {
    const requestId = req.requestId;
    try {
      logger.debug(`[ID=${requestId}]: Inside ${CategoryController.getCategoryList.name} controller`);
      const response = await categoryRepository.getCategoryList({ requestId });

      logger.debug(`[ID=${requestId}]: Sending response from ${CategoryController.getCategoryList.name} controller`);
      res.render("home", {
        isHomePage : true,
        title      : "Category List",
        categories : response.data.payload,
      });
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error while obtain category list data in ${CategoryController.getCategoryList.name} controller`);
      next(error);
    }
  }

  public static async getCategoryById (req: Request, res: Response, next: NextFunction): Promise<void> {
    const requestId = req.requestId;
    try {
      const { categoryId } = req.params;
      logger.debug(`[ID=${requestId}]: Inside ${CategoryController.getCategoryById.name} controller`);
      const category = await categoryRepository.getCategoryById({ requestId, payload: { categoryId } });

      logger.debug(`[ID=${requestId}]: Sending response from ${CategoryController.getCategoryById.name} controller`);
      res.render("category", {
        isCategoryPage : true,
        category       : category.data,
        categoryId     : category.data._id,
        categoryName   : category.data.name,
        title          : "Category Details",
      });
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error while obtain category by ID in ${CategoryController.getCategoryById.name} controller`);
      next(error);
    }
  }
}
