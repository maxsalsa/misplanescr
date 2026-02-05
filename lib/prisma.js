import { PrismaClient } from "@prisma/client";

/**
 * Singleton de Prisma Client
 * Evita múltiples instancias de conexión a base de datos en entorno Serverless/Dev.
 *
 * @see https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */
const prismaClientSingleton = () => {
  return new PrismaClient();
};

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
