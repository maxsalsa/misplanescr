/*
  Warnings:

  - You are about to drop the `_GroupToPedagogicalResource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudentGroups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `asignaturas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `conduct_reports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `curriculum_maps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `family_communications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gamification_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `grade_entries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gradebooks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `guide_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `import_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `institutions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `learning_outcomes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `modalidades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `neuro_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `niveles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pedagogical_resources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `predictive_drafts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `security_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `semantic_cache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student_achievements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unidades_estudio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `units` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroupToPedagogicalResource" DROP CONSTRAINT "_GroupToPedagogicalResource_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToPedagogicalResource" DROP CONSTRAINT "_GroupToPedagogicalResource_B_fkey";

-- DropForeignKey
ALTER TABLE "_StudentGroups" DROP CONSTRAINT "_StudentGroups_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudentGroups" DROP CONSTRAINT "_StudentGroups_B_fkey";

-- DropForeignKey
ALTER TABLE "asignaturas" DROP CONSTRAINT "asignaturas_nivel_id_fkey";

-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_group_id_fkey";

-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_student_id_fkey";

-- DropForeignKey
ALTER TABLE "conduct_reports" DROP CONSTRAINT "conduct_reports_student_id_fkey";

-- DropForeignKey
ALTER TABLE "conduct_reports" DROP CONSTRAINT "conduct_reports_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "curriculum_maps" DROP CONSTRAINT "curriculum_maps_institution_id_fkey";

-- DropForeignKey
ALTER TABLE "family_communications" DROP CONSTRAINT "family_communications_student_id_fkey";

-- DropForeignKey
ALTER TABLE "gamification_profiles" DROP CONSTRAINT "gamification_profiles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "grade_entries" DROP CONSTRAINT "grade_entries_gradebook_id_fkey";

-- DropForeignKey
ALTER TABLE "grade_entries" DROP CONSTRAINT "grade_entries_student_id_fkey";

-- DropForeignKey
ALTER TABLE "gradebooks" DROP CONSTRAINT "gradebooks_group_id_fkey";

-- DropForeignKey
ALTER TABLE "gradebooks" DROP CONSTRAINT "gradebooks_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_institution_id_fkey";

-- DropForeignKey
ALTER TABLE "guide_logs" DROP CONSTRAINT "guide_logs_student_id_fkey";

-- DropForeignKey
ALTER TABLE "guide_logs" DROP CONSTRAINT "guide_logs_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "import_logs" DROP CONSTRAINT "import_logs_institution_id_fkey";

-- DropForeignKey
ALTER TABLE "import_logs" DROP CONSTRAINT "import_logs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "learning_outcomes" DROP CONSTRAINT "learning_outcomes_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "neuro_profiles" DROP CONSTRAINT "neuro_profiles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "niveles" DROP CONSTRAINT "niveles_modalidad_id_fkey";

-- DropForeignKey
ALTER TABLE "pedagogical_resources" DROP CONSTRAINT "pedagogical_resources_author_id_fkey";

-- DropForeignKey
ALTER TABLE "pedagogical_resources" DROP CONSTRAINT "pedagogical_resources_outcome_id_fkey";

-- DropForeignKey
ALTER TABLE "predictive_drafts" DROP CONSTRAINT "predictive_drafts_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_institution_id_fkey";

-- DropForeignKey
ALTER TABLE "security_logs" DROP CONSTRAINT "security_logs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "student_achievements" DROP CONSTRAINT "student_achievements_student_id_fkey";

-- DropForeignKey
ALTER TABLE "unidades_estudio" DROP CONSTRAINT "unidades_estudio_asignatura_id_fkey";

-- DropForeignKey
ALTER TABLE "units" DROP CONSTRAINT "units_curriculum_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_institution_id_fkey";

-- DropTable
DROP TABLE "_GroupToPedagogicalResource";

-- DropTable
DROP TABLE "_StudentGroups";

-- DropTable
DROP TABLE "asignaturas";

-- DropTable
DROP TABLE "attendance";

-- DropTable
DROP TABLE "conduct_reports";

-- DropTable
DROP TABLE "curriculum_maps";

-- DropTable
DROP TABLE "family_communications";

-- DropTable
DROP TABLE "gamification_profiles";

-- DropTable
DROP TABLE "grade_entries";

-- DropTable
DROP TABLE "gradebooks";

-- DropTable
DROP TABLE "groups";

-- DropTable
DROP TABLE "guide_logs";

-- DropTable
DROP TABLE "import_logs";

-- DropTable
DROP TABLE "institutions";

-- DropTable
DROP TABLE "learning_outcomes";

-- DropTable
DROP TABLE "modalidades";

-- DropTable
DROP TABLE "neuro_profiles";

-- DropTable
DROP TABLE "niveles";

-- DropTable
DROP TABLE "pedagogical_resources";

-- DropTable
DROP TABLE "predictive_drafts";

-- DropTable
DROP TABLE "quotes";

-- DropTable
DROP TABLE "security_logs";

-- DropTable
DROP TABLE "semantic_cache";

-- DropTable
DROP TABLE "student_achievements";

-- DropTable
DROP TABLE "unidades_estudio";

-- DropTable
DROP TABLE "units";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "ResourceType";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'SUBSCRIBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumFamily" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CurriculumFamily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumLevel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,

    CONSTRAINT "CurriculumLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumUnit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,

    CONSTRAINT "CurriculumUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningOutcome" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,

    CONSTRAINT "LearningOutcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Indicator" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "outcomeId" TEXT NOT NULL,

    CONSTRAINT "Indicator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityTemplate" (
    "id" TEXT NOT NULL,
    "indicatorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dualStrategyTDAH" TEXT,
    "dualStrategyTEA" TEXT,
    "multipleIntel" TEXT,
    "rubricL1" TEXT,
    "rubricL3" TEXT,

    CONSTRAINT "ActivityTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "learningProfile" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "curriculumLevelId" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedagogicalPlan" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rubricJson" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PedagogicalPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdaptationSuggestion" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdaptationSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumFamily_name_key" ON "CurriculumFamily"("name");

-- AddForeignKey
ALTER TABLE "CurriculumLevel" ADD CONSTRAINT "CurriculumLevel_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "CurriculumFamily"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumUnit" ADD CONSTRAINT "CurriculumUnit_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "CurriculumLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningOutcome" ADD CONSTRAINT "LearningOutcome_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "CurriculumUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indicator" ADD CONSTRAINT "Indicator_outcomeId_fkey" FOREIGN KEY ("outcomeId") REFERENCES "LearningOutcome"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityTemplate" ADD CONSTRAINT "ActivityTemplate_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_curriculumLevelId_fkey" FOREIGN KEY ("curriculumLevelId") REFERENCES "CurriculumLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedagogicalPlan" ADD CONSTRAINT "PedagogicalPlan_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
