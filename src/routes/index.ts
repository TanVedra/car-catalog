import { Express } from "express";

import adminRoutes from "./admin";
import mainRoutes from "./main";
import { NotFoundError } from "../services/errors/errorWrappers";

export default function registerAllRoutes(app: Express): void {
  app
    .use(mainRoutes.register())
    .use(adminRoutes.register())
    // Catch-all for 404 Not Found
    .use((req, res, next) => {
      const error = new NotFoundError(`Incorrect path ${req.method.toUpperCase()} '${req.path}'`);
      next(error);
    });
}
