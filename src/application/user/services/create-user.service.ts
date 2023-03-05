import { UserRepositoryInterface } from "@domain/user/repository/user-interface-repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateuserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UserRepositoryInterface
  ) {}

  public async execute(): Promise<any> {
    return "a";
  }
}
