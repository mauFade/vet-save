import { Router } from "express";

import { v1Routes } from "./v1";

const appRoutes = Router();

appRoutes.use("/v1", v1Routes);

export { appRoutes };
