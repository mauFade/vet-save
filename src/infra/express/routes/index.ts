/* eslint-disable @typescript-eslint/no-unused-vars */
import { ResourceNotFoundError } from "@application/@shared/errors";
import { Router } from "express";

import { v1Routes } from "./v1";

const appRoutes = Router();

appRoutes.get("/health-checks", (_req, res) => {
  return res.status(200).json({
    success: {
      responseType: "SUCCESS_REQUEST",
      message: "The application is healthy.",
    },
  });
});

appRoutes.use("/v1", v1Routes);

appRoutes.all("*/*", (req, _res) => {
  throw new ResourceNotFoundError(
    `Cannot found resource ${req.method} ${req.path}.`
  );
});

export { appRoutes };
