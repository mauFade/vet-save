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

type ExpressErrorLogger = (
  rr: ErrorInterface,
  req: Request,
  _res: Response,
  _: NextFunction
) => Response;

type IHttpLogger = {
  req_logger: (
    param: IExpresssReqResLoggerParams
  ) => IExpressRequestLoggerResponse;
  err_logger: (param: IExpresssReqResLoggerParams) => ExpressErrorLogger;
};

function expressRequestLogger(
  options: IExpresssReqResLoggerParams
): IExpressRequestLoggerResponse {
  const { logger } = options;

  return (req: Request, res: Response, next: NextFunction): void => {
    function onResDone(error: Error) {
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
