import { Router } from "express";

import CategoryController from "../controllers/category";

class HomeRouter  {
  private router: Router;

  constructor (router: Router) {
    this.router = router;
  }

  public register(): Router {
    this.router.route("/")
      .get(CategoryController.getCategoryList);

    return this.router;
  }
}

export default new HomeRouter(Router());
