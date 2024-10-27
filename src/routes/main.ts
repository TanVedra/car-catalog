import { Router } from "express";

import MainController from "../controllers/main";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { getCarById } from "../schemas/cars";
import { getCategoryById } from "../schemas/category";

class MainRouter  {
  private router: Router;

  constructor (router: Router) {
    this.router = router;
  }

  public register(): Router {
    this.router.route("/")
      .get(MainController.getHomePage);

    this.router.route("/categories/:categoryId")
      .get(
        validationMiddleware(getCategoryById),
        MainController.getCategoryPage,
      );

    this.router.route("/categories/:categoryId/cars/:carId")
      .get(
        validationMiddleware(getCarById),
        MainController.getCarPage,
      );

    return this.router;
  }
}

export default new MainRouter(Router());
