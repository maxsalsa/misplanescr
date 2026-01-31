import { PrismaClient } from "@prisma/client";

// Evita múltiples instancias en desarrollo (Hot Reload)
const globalForPrisma = global;

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = db;
}

export default db;