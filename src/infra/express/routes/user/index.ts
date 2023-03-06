import { CreateUserController } from "@application/user/infra/controllers/create-user.controller";
import { ListAllUserController } from "@application/user/infra/controllers/list-all-user.controller";
import { Router } from "express";

const userRoutes = Router();

const createUserController = new CreateUserController();
const listAllUserController = new ListAllUserController();

userRoutes.post("/register", createUserController.handle);

userRoutes.get("/", listAllUserController.handle);

export { userRoutes };
