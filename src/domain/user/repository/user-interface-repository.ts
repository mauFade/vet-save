import { CreateUserDTO } from "@application/user/dto/create-user.dto";

import { UserModel } from "../entity/user.model";

export interface UserRepositoryInterface {
  create(data: CreateUserDTO): Promise<UserModel>;
  find(): Promise<UserModel[]>;
  findByEmail(email: string): Promise<UserModel | undefined>;
}
