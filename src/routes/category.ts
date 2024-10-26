import { Router } from "express";

import CategoryController from "../controllers/category";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { getCategoryById } from "../schemas/category";

class CategoryRouter  {
  private router: Router;

  constructor (router: Router) {
    this.router = router;
  }

  public register(): Router {
    this.router.route("/categories/:categoryId")
      .get(
        validationMiddleware(getCategoryById),
        CategoryController.getCategoryById,
      );

    return this.router;
  }
}

export default new CategoryRouter(Router());
