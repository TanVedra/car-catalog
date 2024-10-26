import util from "node:util";

import winston, { Logform } from "winston";

const {
  printf,
  combine,
  colorize,
  timestamp,
} = winston.format;
const LEVELS = {
  error : 0,
  warn  : 1,
  info  : 2,
  debug : 4,
};
const COLORS = {
  info  : "bgWhite bold black",
  debug : "green",
  error : "bold red",
  warn  : "italic yellow",
};

winston.addColors(COLORS);

const TRANSPORTS = [
  new winston.transports.Console({
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
      printf(
        (info: Logform.TransformableInfo) => colorize()
          .colorize(info.level, `${info.level.toUpperCase()} [${info.timestamp}]: ${info.message}\n`),
      ),
    ),
  }),
  // new winston.transports.File({
  //   filename: "./logs/car-catalog-service.log",
  // }),
];

const attachExceptionStackTrace = winston.format((info: Logform.TransformableInfo) => {
  if (info instanceof Error) {
    info[Symbol.for("splat")] = [info.stack];
  }

  info.message = util.format(
    info.message,
    ...(info[Symbol.for("splat")] || []),
  );
  return info;
});

const logger = winston.createLogger({
  levels      : LEVELS,
  transports  : TRANSPORTS,
  format      : attachExceptionStackTrace(),
  level       : process.env.LOGGING_LEVEL || "info",
  defaultMeta : {
    env : process.env.NODE_ENV,
    app : "car-catalog-service",
  },
});

export default logger;
