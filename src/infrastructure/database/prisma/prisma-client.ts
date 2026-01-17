import { PrismaClient } from "@prisma/client";
import { env } from "../../config";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: env.NODE_ENV === "local" ? ["query", "error", "warn"] : ["error"],
  });
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}