import { prisma } from "@configs/prisma";
import { PrismaClient } from "@prisma/client";

export class UserRepository {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
  }
}
