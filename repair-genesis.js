const fs = require("fs");
const path = require("path");

const schema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

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
  subject     String?
  level       String?
  content     Json
  status      String   @default("PUBLISHED")
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
  email       String?
  groupId     String
  group       Group    @relation(fields: [groupId], references: [id])
}`;

fs.writeFileSync(path.join(__dirname, "prisma", "schema.prisma"), schema, { encoding: "utf8" });