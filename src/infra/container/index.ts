import { UserRepository } from "@application/user/infra/repositories/user.repository";
import { UserRepositoryInterface } from "@domain/user/repository/user-interface-repository";
import { container } from "tsyringe";

container.registerSingleton<UserRepositoryInterface>(
  "UsersRepository",
  UserRepository
);
