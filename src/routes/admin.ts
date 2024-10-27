import { Router } from "express";

import AdminController from "../controllers/admin";

class AdminRouter  {
  private router: Router;

  constructor (router: Router) {
    this.router = router;
  }

  public register(): Router {
    this.router.route("/admin/login")
      .get(AdminController.getLoginPage);
    // Redirect all wrong requests to login page
    this.router.route("/admin/*")
      .get(AdminController.redirectToLoginPage);

    return this.router;
  }
}

export default new AdminRouter(Router());
