import { Request, Response, NextFunction } from "express";
import winston from "winston";

import { ErrorInterface } from "../errors";
import { AppLogger } from "./logger";

type IExpresssReqResLoggerParams = { logger: winston.Logger };

type IExpressRequestLoggerResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

type IExpressErrorLogger = (
  rr: ErrorInterface,
  req: Request,
  _res: Response,
  _: NextFunction
) => Response;

type IHttpLogger = {
  req_logger: (
    param: IExpresssReqResLoggerParams
  ) => IExpressRequestLoggerResponse;
  err_logger: (param: IExpresssReqResLoggerParams) => IExpressErrorLogger;
};

function expressRequestLogger(
  options: IExpresssReqResLoggerParams
): IExpressRequestLoggerResponse {
  const { logger } = options;

  return (req: Request, res: Response, next: NextFunction): void => {
    function onResDone() {
      res.removeListener("finish", onResDone);
      res.removeListener("error", onResDone);
    }

    logger.info(
      `Handled ${req.method} on ${req.path}. Body: ${JSON.stringify(req.body)}`
    );

    res.on("finish", onResDone);
    res.on("error", onResDone);

    next();
  };
}

function expressErrorLogger(): IExpressErrorLogger {
  return (error: ErrorInterface, req: Request, _res: Response): Response => {
    AppLogger.error(error);

    return _res
      .status(error.type === "DomainError" ? 400 : error.status || 500)
      .json({
        error: {
          errorType: error.type,
          message: error.message,
        },
      });
  };
}

export const httpLogger = {
  err_logger: expressErrorLogger,
  req_logger: expressRequestLogger,
} as IHttpLogger;
