import { UserModel } from "@domain/user/entity/user.model";
import { UserRepositoryInterface } from "@domain/user/repository/user-interface-repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAllUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UserRepositoryInterface
  ) {}

  public async execute(): Promise<UserModel[]> {
    const data = await this.usersRepository.find();

    return data;
  }
}
