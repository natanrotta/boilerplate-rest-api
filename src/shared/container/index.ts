import "reflect-metadata";
import { container } from "tsyringe";

import { IUserRepository } from "../../domain/repositories";
import { PrismaUserRepository } from "../../infrastructure/database/prisma/repositories";

import { ICacheProvider, IHashProvider, IMessagingProvider } from "../../domain/providers";
import { BcryptHashProvider, RedisCacheProvider, ZApiMessagingProvider } from "@infrastructure/provider";


// Repositories
container.registerSingleton<IUserRepository>("UserRepository", PrismaUserRepository);

// Providers
container.registerSingleton<ICacheProvider>("CacheProvider", RedisCacheProvider);
container.registerSingleton<IHashProvider>("HashProvider", BcryptHashProvider);
container.registerSingleton<IMessagingProvider>("MessagingProvider", ZApiMessagingProvider);

export { container };