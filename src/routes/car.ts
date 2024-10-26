import { Router } from "express";

import CarController from "../controllers/car";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { getCarById } from "../schemas/cars";

class CarRouter  {
  private router: Router;

  constructor (router: Router) {
    this.router = router;
  }

  public register (): Router {
    this.router.route("/categories/:categoryId/cars/:carId")
      .get(
        validationMiddleware(getCarById),
        CarController.getCarById,
      );

    return this.router;
  }
}

export default new CarRouter(Router());
