import { PrismaClient } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO } from "./model";
import { mapPrismaError } from "../../core/prisma-error-map";

const prisma = new PrismaClient();

class UserRepository {
  async findUnique({ id }: { id: string }) {
    try {
      return await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          phone: true,
          document: true,
        },
      });
    } catch (e) {
      throw mapPrismaError(e);
    }
  }

  async findAll() {
    try {
      return await prisma.user.findMany({ select: { id: true } });
    } catch (e) {
      throw mapPrismaError(e);
    }
  }

  async create({ data }: { data: CreateUserDTO }) {
    try {
      return await prisma.user.create({ data });
    } catch (e) {
      throw mapPrismaError(e);
    }
  }

  async update({ id, data }: { id: string; data: UpdateUserDTO }) {
    try {
      return await prisma.user.update({ where: { id }, data });
    } catch (e) {
      throw mapPrismaError(e);
    }
  }

  async findByEmail({ email }: { email: string }) {
    try {
      return await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
        },
      });
    } catch (e) {
      throw mapPrismaError(e);
    }
  }
}

export default new UserRepository();
