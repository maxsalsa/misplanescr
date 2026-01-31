const fs = require("fs");
const path = require("path");

console.log("   ⚡ REGENERANDO SCHEMA.PRISMA SIN CARACTERES OCULTOS...");

const schema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ROLES DEL SISTEMA (JERARQUÍA MEP)
enum Role {
  GOD_TIER
  SUPERADMIN
  DIRECTOR
  DOCENTE
  ESTUDIANTE
  FAMILIA
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  password      String?
  role          Role      @default(DOCENTE)
  schoolId      String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  planes        LessonPlan[]
  grupos        Group[]
  
  @@map("users")
}

model LessonPlan {
  id          String   @id @default(cuid())
  title       String
  content     Json
  status      String   @default("DRAFT")
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Group {
  id          String   @id @default(cuid())
  name        String
  grade       String
  shift       String
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  students    Student[]
}

model Student {
  id          String   @id @default(cuid())
  name        String
  groupId     String
  group       Group    @relation(fields: [groupId], references: [id])
}`;

// Escribir archivo limpio (UTF-8 sin BOM)
fs.writeFileSync(path.join(__dirname, "prisma", "schema.prisma"), schema, { encoding: "utf8" });
console.log("   ✅ SCHEMA REPARADO.");