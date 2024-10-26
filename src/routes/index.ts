import { Express } from "express";

import carRoutes from "./car";
import categoryRoutes from "./category";
import homeRoutes from "./home";
import { NotFoundError } from "../services/errors/errorWrappers";

export default function registerAllRoutes(app: Express): void {
  app
    .use(homeRoutes.register())
    .use(categoryRoutes.register())
    .use(carRoutes.register())
    // Catch-all for 404 Not Found
    .use((req, res, next) => {
      const error = new NotFoundError(`Incorrect path '${req.path}'`);
      next(error);
    });
}
