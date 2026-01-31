const fs = require("fs");
const path = require("path");

// EL TRUCO ESTÁ AQUÍ: "updatedAt DateTime @default(now()) @updatedAt"
// Esto permite que los datos viejos tengan una fecha por defecto.

const schemaContent = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                  String       @id @default(cuid())
  email               String       @unique
  password            String
  name                String?
  role                String       @default("USER")
  subscriptionStatus  String       @default("FREE")
  customData          Json?        
  twoFactorEnabled    Boolean      @default(false)
  twoFactorSecret     String?
  forceChangePassword Boolean      @default(false)
  resetToken          String?
  resetTokenExpiry    DateTime?
  lastActive          DateTime     @default(now())
  createdAt           DateTime     @default(now())
  updatedAt           DateTime     @default(now()) @updatedAt
  plans               LessonPlan[]
  assessments         Assessment[]
}

model Subject {
  id             String       @id @default(cuid())
  name           String
  code           String?
  educationLevel String       
  modalityType   String       
  assessments    Assessment[]
  units          StudyUnit[]
  plans          LessonPlan[] 
  @@unique([name, educationLevel, modalityType])
}

model StudyUnit {
  id        String   @id @default(cuid())
  title     String
  grade     String?
  subjectId String
  subject   Subject  @relation(fields: [subjectId], references: [id])
}

model LessonPlan {
  id        String   @id @default(cuid())
  title     String
  content   Json     
  status    String   @default("DRAFT")
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  subjectId String?  
  subject   Subject? @relation(fields: [subjectId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt 
}

model Assessment {
  id         String   @id @default(cuid())
  title      String
  type       String   
  content    Json     
  rubric     Json?    
  specsTable Json?    
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  subjectId  String
  subject    Subject  @relation(fields: [subjectId], references: [id])
  createdAt  DateTime @default(now())
}
`;

fs.writeFileSync(path.join(__dirname, "prisma", "schema.prisma"), schemaContent, { encoding: "utf8" });
console.log("✅ Schema corregido con valores por defecto para evitar errores.");