import crypto from "node:crypto";

import { Request, Response, NextFunction } from "express";

import logger from "../services/logger";
import { measureTime } from "../services/measureTime";

export default function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  const time = measureTime();
  req.requestId = crypto.randomUUID();
  res.once("close", () => {
    const message = `[ID=${req.requestId}]: ${req.method} ${req.path} REQUEST HAS BEEN FINISHED IN ${time()}ms`;
    logger.debug(message);
  });

  logger.debug(`[ID=${req.requestId}]: ${req.method} ${req.path} REQUEST`);
  next();
}
