import { injectable } from "tsyringe";
import { User } from "../../../../domain/entities";
import {
  IUserRepository,
  CreateUserData,
  UpdateUserData,
} from "../../../../domain/repositories";
import { prisma } from "../prisma-client";
import { mapPrismaError } from "../prisma-error-mapper";

@injectable()
export class PrismaUserRepository implements IUserRepository {
  private toEntity(data: {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    document: string;
    created_at: Date;
    updated_at: Date;
  }): User {
    return new User({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      document: data.document,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    });
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      return user ? this.toEntity(user) : null;
    } catch (error) {
      throw mapPrismaError(error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      return user ? this.toEntity(user) : null;
    } catch (error) {
      throw mapPrismaError(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await prisma.user.findMany({
        orderBy: { created_at: "desc" },
      });
      return users.map(this.toEntity);
    } catch (error) {
      throw mapPrismaError(error);
    }
  }

  async create(data: CreateUserData): Promise<User> {
    try {
      const user = await prisma.user.create({ data });
      return this.toEntity(user);
    } catch (error) {
      throw mapPrismaError(error);
    }
  }

  async update(id: string, data: UpdateUserData): Promise<User> {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: { ...data, updated_at: new Date() },
      });
      return this.toEntity(user);
    } catch (error) {
      throw mapPrismaError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.user.delete({ where: { id } });
    } catch (error) {
      throw mapPrismaError(error);
    }
  }
}