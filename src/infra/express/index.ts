import "express-async-errors";
import { httpLogger } from "@application/@shared/logger";
import { errors } from "celebrate";
import cors from "cors";
import express from "express";
import { createServer, Server } from "http";
import winston from "winston";

import { appRoutes } from "./routes";

export class ExpressServer {
  private express: express.Express;
  private server: Server;
  private port: number;
  private logger: winston.Logger;

  constructor(port: number, logger: winston.Logger) {
    this.port = port;
    this.express = express();
    this.server = createServer(this.express);
    this.logger = logger;

    this.validate();
    this.config();
    this.handlers();
    this.handleParseErrors();
  }

  get _server(): Server {
    return this.server;
  }

  private validate(): void {
    if (this.port < 1000 || this.port > 65535) {
      throw new Error("Invalid port number.");
    }
  }

  private config(): void {
    this.express.use(
      cors({
        origin: "*",
      })
    );

    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(httpLogger.req_logger({ logger: this.logger }));
  }

  private handlers(): void {
    this.express.use(appRoutes);
  }

  private handleParseErrors(): void {
    this.express.use(
      errors({
        statusCode: 422,
      })
    );

    this.express.use(httpLogger.err_logger({ logger: this.logger }));
  }

  public start(): void {
    this.server.listen(this.port);
    this.logger.info(`HTTP server running at port ${this.port}`);
  }
}
