import "reflect-metadata";
import "dotenv/config";
import { AppLogger } from "@application/@shared/logger";
import { ExpressServer } from "@infra/express";

import "@infra/container";

const logger = AppLogger.init();
const PORT = Number(process.env.PORT) || 33333;

const httpServer = new ExpressServer(PORT, logger);

httpServer.start();
