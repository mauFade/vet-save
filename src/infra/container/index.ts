import { UserRepository } from "@application/user/infra/repositories/user.repository";
import { UserRepositoryInterface } from "@domain/user/repository/user-interface-repository";
import { BCryptAdapterInterface } from "@infra/bcrypt/bcrypt.interface";
import { BCryptAdapter } from "@infra/bcrypt/implementations/bcrypt.adapter";
import { container } from "tsyringe";

container.registerSingleton<BCryptAdapterInterface>(
  "EncryptAdapter",
  BCryptAdapter
);

container.registerSingleton<UserRepositoryInterface>(
  "UsersRepository",
  UserRepository
);
