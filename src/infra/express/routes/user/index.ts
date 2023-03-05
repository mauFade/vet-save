import { CreateUserController } from "@application/user/infra/controllers/create-user.controller";
import { Router } from "express";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/register", createUserController.handle);

export { userRoutes };
