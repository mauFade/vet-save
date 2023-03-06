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
    const data: users[] = await this.prismaClient
      .$queryRaw`SELECT * FROM "users"`;

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
    const user: users[] = await this.prismaClient
      .$queryRaw`SELECT * FROM users WHERE email = ${email}`;

    if (user) {
      return new UserModel(
        user[0].id,
        user[0].name,
        user[0].email,
        user[0].password,
        user[0].age,
        user[0].created_at,
        user[0].updated_at
      );
    }

    return undefined;
  }
}
