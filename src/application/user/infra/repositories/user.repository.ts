import { CreateUserDTO } from "@application/user/dto/create-user.dto";
import { prisma } from "@configs/prisma";
import { UserModel } from "@domain/user/entity/user.model";
import { UserRepositoryInterface } from "@domain/user/repository/user-interface-repository";
import { PrismaClient, users } from "@prisma/client";

export class UserRepository implements UserRepositoryInterface {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  public async create({
    name,
    email,
    password,
    age,
  }: CreateUserDTO): Promise<UserModel> {
    const user = await this.prismaClient.users.create({
      data: {
        name,
        email,
        password,
        age,
      },
    });

    return new UserModel(
      user.id,
      user.name,
      user.email,
      user.password,
      user.age,
      user.created_at,
      user.updated_at
    );
  }

  public async find(): Promise<UserModel[]> {
    const data = await this.prismaClient.users.findMany();

    return data.map((user) => {
      return new UserModel(
        user.id,
        user.name,
        user.email,
        user.password,
        user.age,
        user.created_at,
        user.updated_at
      );
    });
  }

  public async findByEmail(email: string): Promise<UserModel | undefined> {
    const user = await this.prismaClient
      .$queryRaw<users>`SELECT * FROM users WHERE email = ${email}`;

    if (user) {
      return new UserModel(
        user.id,
        user.name,
        user.email,
        user.password,
        user.age,
        user.created_at,
        user.updated_at
      );
    }

    return undefined;
  }
}
