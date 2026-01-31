const fs = require("fs");
const path = require("path");

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
  updatedAt           DateTime     @updatedAt
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
  updatedAt DateTime @updatedAt
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

// Escribir el archivo SIN BOM (Codificación UTF-8 pura)
fs.writeFileSync(path.join(__dirname, "prisma", "schema.prisma"), schemaContent, { encoding: "utf8" });
console.log("✅ Archivo schema.prisma reescrito limpiamente (UTF-8 Clean).");