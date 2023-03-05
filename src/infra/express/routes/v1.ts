import { Router } from "express";

import { userRoutes } from "./user";

const v1Routes = Router();

v1Routes.use("/user", userRoutes);

export { v1Routes };
