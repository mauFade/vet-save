import { AlreadyExistsError } from "@application/@shared/errors";
import { UserModel } from "@domain/user/entity/user.model";
import { UserRepositoryInterface } from "@domain/user/repository/user-interface-repository";
import { BCryptAdapterInterface } from "@infra/bcrypt/bcrypt.interface";
import { inject, injectable } from "tsyringe";

import { CreateUserDTO } from "../dto/create-user.dto";

@injectable()
export class CreateuserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UserRepositoryInterface,
    @inject("EncryptAdapter")
    private encryptAdapter: BCryptAdapterInterface
  ) {}

  public async execute({
    age,
    email,
    name,
    password,
  }: CreateUserDTO): Promise<UserModel> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AlreadyExistsError("This e-mail is already in use.");
    }

    const hash = await this.encryptAdapter.create(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hash,
      age,
    });

    return user;
  }
}
