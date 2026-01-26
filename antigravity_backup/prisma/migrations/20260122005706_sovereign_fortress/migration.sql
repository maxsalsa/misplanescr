/*
  Warnings:

  - The values [DOCENTE_TECNICO] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `article_rea` on the `conduct_reports` table. All the data in the column will be lost.
  - You are about to drop the column `infraction` on the `conduct_reports` table. All the data in the column will be lost.
  - You are about to drop the column `is_group_guide` on the `conduct_reports` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `conduct_reports` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `conduct_reports` table. All the data in the column will be lost.
  - You are about to drop the column `comments` on the `grade_entries` table. All the data in the column will be lost.
  - You are about to drop the column `grade_book_id` on the `grade_entries` table. All the data in the column will be lost.
  - You are about to drop the column `awarded_at` on the `student_achievements` table. All the data in the column will be lost.
  - You are about to drop the column `awarded_by` on the `student_achievements` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `student_achievements` table. All the data in the column will be lost.
  - You are about to drop the column `icon_url` on the `student_achievements` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `student_achievements` table. All the data in the column will be lost.
  - You are about to drop the column `cedula` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_login` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `mep_email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `planeamientos_count` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_customer_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_subscription_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `audit_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bloques_curriculares` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `documentos_mep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `educational_resources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `evidence_portfolio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `family_links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `grade_books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mediaciones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meetings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `planes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `conduct_reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `conduct_reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `grade_entries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gradebook_id` to the `grade_entries` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('PLAN_ANUAL', 'PLAN_UNIDAD', 'PLAN_DIARIO', 'ACTIVIDAD_MEDIACION', 'TRABAJO_COTIDIANO', 'TAREA_CORTA', 'PRUEBA_CORTA', 'EXAMEN', 'RUBRICA', 'GUIA_AUTONOMA', 'PRACTICA', 'REPASO', 'RESUMEN', 'INFOGRAFIA', 'MATERIAL_APOYO', 'CAPSULA_FAMILIA');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('SUPER_ADMIN', 'DIRECTOR', 'DOCENTE', 'ESTUDIANTE', 'FAMILIA');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'DOCENTE';
COMMIT;

-- DropForeignKey
ALTER TABLE "audit_logs" DROP CONSTRAINT "audit_logs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "bloques_curriculares" DROP CONSTRAINT "bloques_curriculares_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "educational_resources" DROP CONSTRAINT "educational_resources_user_id_fkey";

-- DropForeignKey
ALTER TABLE "evidence_portfolio" DROP CONSTRAINT "evidence_portfolio_student_id_fkey";

-- DropForeignKey
ALTER TABLE "family_links" DROP CONSTRAINT "family_links_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "family_links" DROP CONSTRAINT "family_links_student_id_fkey";

-- DropForeignKey
ALTER TABLE "grade_books" DROP CONSTRAINT "grade_books_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "grade_entries" DROP CONSTRAINT "grade_entries_grade_book_id_fkey";

-- DropForeignKey
ALTER TABLE "mediaciones" DROP CONSTRAINT "mediaciones_bloque_id_fkey";

-- DropForeignKey
ALTER TABLE "meetings" DROP CONSTRAINT "meetings_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "meetings" DROP CONSTRAINT "meetings_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "planes" DROP CONSTRAINT "planes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "student_achievements" DROP CONSTRAINT "student_achievements_student_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_user_id_fkey";

-- DropIndex
DROP INDEX "users_cedula_key";

-- DropIndex
DROP INDEX "users_mep_email_key";

-- AlterTable
ALTER TABLE "conduct_reports" DROP COLUMN "article_rea",
DROP COLUMN "infraction",
DROP COLUMN "is_group_guide",
DROP COLUMN "level",
DROP COLUMN "status",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "grade_entries" DROP COLUMN "comments",
DROP COLUMN "grade_book_id",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "gradebook_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "student_achievements" DROP COLUMN "awarded_at",
DROP COLUMN "awarded_by",
DROP COLUMN "description",
DROP COLUMN "icon_url",
DROP COLUMN "points";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cedula",
DROP COLUMN "last_login",
DROP COLUMN "mep_email",
DROP COLUMN "password_hash",
DROP COLUMN "phone_number",
DROP COLUMN "plan",
DROP COLUMN "planeamientos_count",
DROP COLUMN "status",
DROP COLUMN "stripe_customer_id",
DROP COLUMN "stripe_subscription_id",
DROP COLUMN "updated_at",
ADD COLUMN     "institution_id" UUID,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "professional_id" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "specialty" TEXT;

-- DropTable
DROP TABLE "audit_logs";

-- DropTable
DROP TABLE "bloques_curriculares";

-- DropTable
DROP TABLE "documentos_mep";

-- DropTable
DROP TABLE "educational_resources";

-- DropTable
DROP TABLE "evidence_portfolio";

-- DropTable
DROP TABLE "family_links";

-- DropTable
DROP TABLE "grade_books";

-- DropTable
DROP TABLE "mediaciones";

-- DropTable
DROP TABLE "meetings";

-- DropTable
DROP TABLE "planes";

-- DropTable
DROP TABLE "subscriptions";

-- DropEnum
DROP TYPE "FaseMediacion";

-- DropEnum
DROP TYPE "PlanPerfil";

-- CreateTable
CREATE TABLE "institutions" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "regional_direction" TEXT,
    "circuit" TEXT,
    "province" TEXT,
    "logo_url" TEXT,
    "address" TEXT,
    "educational_level" TEXT NOT NULL DEFAULT 'SECUNDARIA_ACADEMICA',
    "schedule" TEXT NOT NULL DEFAULT 'DIURNO',
    "master_token" TEXT,
    "license_slots" INTEGER NOT NULL DEFAULT 0,
    "license_used" INTEGER NOT NULL DEFAULT 0,
    "subscriptionPlan" TEXT NOT NULL DEFAULT 'free',
    "billing_status" TEXT NOT NULL DEFAULT 'PENDING',
    "license_expires_at" TIMESTAMP(3),
    "last_quote_date" TIMESTAMP(3),

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "id" UUID NOT NULL,
    "institution_id" UUID NOT NULL,
    "quoteNumber" TEXT NOT NULL,
    "totalSeats" INTEGER NOT NULL,
    "pricePerSeat" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "valid_until" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "subGroup" TEXT,
    "specialty" TEXT,
    "level" TEXT NOT NULL,
    "year" INTEGER NOT NULL DEFAULT 2026,
    "institution_id" UUID NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security_logs" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "event" TEXT NOT NULL,
    "ip_address" TEXT,
    "metadata" JSONB,
    "severity" TEXT NOT NULL DEFAULT 'INFO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculum_maps" (
    "id" UUID NOT NULL,
    "institution_id" UUID NOT NULL,
    "subject" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "curriculum_maps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" UUID NOT NULL,
    "curriculum_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_outcomes" (
    "id" UUID NOT NULL,
    "unit_id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "indicators" TEXT[],

    CONSTRAINT "learning_outcomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedagogical_resources" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "content_json" JSONB NOT NULL,
    "html_content" TEXT,
    "subject" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "author_id" UUID NOT NULL,
    "outcome_id" UUID,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isTemplate" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "pdf_source_hash" TEXT,

    CONSTRAINT "pedagogical_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "import_logs" (
    "id" UUID NOT NULL,
    "institution_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "filename" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "records_count" INTEGER NOT NULL,
    "error_log" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "import_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_communications" (
    "id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sentVia" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "family_communications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gradebooks" (
    "id" UUID NOT NULL,
    "teacher_id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "subject" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "weights" JSONB NOT NULL,

    CONSTRAINT "gradebooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "neuro_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "hasDiagnosis" BOOLEAN NOT NULL DEFAULT false,
    "conditions" TEXT[],
    "needsAccess" BOOLEAN NOT NULL DEFAULT false,
    "needsNonSignif" BOOLEAN NOT NULL DEFAULT false,
    "needsSignif" BOOLEAN NOT NULL DEFAULT false,
    "anxiety_level" TEXT,
    "medication" TEXT,
    "vision_needs" TEXT,
    "talents" TEXT[],
    "notes" TEXT,

    CONSTRAINT "neuro_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guide_logs" (
    "id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "teacher_id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "agreements" TEXT,

    CONSTRAINT "guide_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "student_id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semantic_cache" (
    "id" UUID NOT NULL,
    "hash" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "hits" INTEGER NOT NULL DEFAULT 0,
    "lastUsed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "semantic_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "predictive_drafts" (
    "id" UUID NOT NULL,
    "teacher_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "contentJson" JSONB NOT NULL,
    "triggerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "predictive_drafts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gamification_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "gamification_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modalidades" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "modalidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "niveles" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "modalidad_id" UUID NOT NULL,

    CONSTRAINT "niveles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asignaturas" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "nivel_id" UUID NOT NULL,

    CONSTRAINT "asignaturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidades_estudio" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "asignatura_id" UUID NOT NULL,
    "curriculum_body" JSONB NOT NULL,
    "apoyos_sugeridos" JSONB NOT NULL,
    "premium_tags" JSONB,
    "pedagogical_hash" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "unidades_estudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StudentGroups" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToPedagogicalResource" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "institutions_code_key" ON "institutions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "institutions_master_token_key" ON "institutions"("master_token");

-- CreateIndex
CREATE UNIQUE INDEX "quotes_quoteNumber_key" ON "quotes"("quoteNumber");

-- CreateIndex
CREATE INDEX "groups_institution_id_idx" ON "groups"("institution_id");

-- CreateIndex
CREATE INDEX "groups_specialty_idx" ON "groups"("specialty");

-- CreateIndex
CREATE INDEX "pedagogical_resources_type_idx" ON "pedagogical_resources"("type");

-- CreateIndex
CREATE INDEX "pedagogical_resources_author_id_idx" ON "pedagogical_resources"("author_id");

-- CreateIndex
CREATE UNIQUE INDEX "neuro_profiles_user_id_key" ON "neuro_profiles"("user_id");

-- CreateIndex
CREATE INDEX "guide_logs_student_id_idx" ON "guide_logs"("student_id");

-- CreateIndex
CREATE INDEX "guide_logs_teacher_id_idx" ON "guide_logs"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "semantic_cache_hash_key" ON "semantic_cache"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "gamification_profiles_user_id_key" ON "gamification_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "modalidades_name_key" ON "modalidades"("name");

-- CreateIndex
CREATE UNIQUE INDEX "unidades_estudio_pedagogical_hash_key" ON "unidades_estudio"("pedagogical_hash");

-- CreateIndex
CREATE INDEX "unidades_estudio_curriculum_body_idx" ON "unidades_estudio" USING GIN ("curriculum_body" jsonb_ops);

-- CreateIndex
CREATE UNIQUE INDEX "_StudentGroups_AB_unique" ON "_StudentGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentGroups_B_index" ON "_StudentGroups"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToPedagogicalResource_AB_unique" ON "_GroupToPedagogicalResource"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToPedagogicalResource_B_index" ON "_GroupToPedagogicalResource"("B");

-- CreateIndex
CREATE INDEX "conduct_reports_student_id_idx" ON "conduct_reports"("student_id");

-- CreateIndex
CREATE INDEX "conduct_reports_teacher_id_idx" ON "conduct_reports"("teacher_id");

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_logs" ADD CONSTRAINT "security_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculum_maps" ADD CONSTRAINT "curriculum_maps_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_curriculum_id_fkey" FOREIGN KEY ("curriculum_id") REFERENCES "curriculum_maps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_outcomes" ADD CONSTRAINT "learning_outcomes_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedagogical_resources" ADD CONSTRAINT "pedagogical_resources_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedagogical_resources" ADD CONSTRAINT "pedagogical_resources_outcome_id_fkey" FOREIGN KEY ("outcome_id") REFERENCES "learning_outcomes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_logs" ADD CONSTRAINT "import_logs_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_logs" ADD CONSTRAINT "import_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_communications" ADD CONSTRAINT "family_communications_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gradebooks" ADD CONSTRAINT "gradebooks_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gradebooks" ADD CONSTRAINT "gradebooks_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_entries" ADD CONSTRAINT "grade_entries_gradebook_id_fkey" FOREIGN KEY ("gradebook_id") REFERENCES "gradebooks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "neuro_profiles" ADD CONSTRAINT "neuro_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guide_logs" ADD CONSTRAINT "guide_logs_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guide_logs" ADD CONSTRAINT "guide_logs_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predictive_drafts" ADD CONSTRAINT "predictive_drafts_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gamification_profiles" ADD CONSTRAINT "gamification_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "niveles" ADD CONSTRAINT "niveles_modalidad_id_fkey" FOREIGN KEY ("modalidad_id") REFERENCES "modalidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignaturas" ADD CONSTRAINT "asignaturas_nivel_id_fkey" FOREIGN KEY ("nivel_id") REFERENCES "niveles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidades_estudio" ADD CONSTRAINT "unidades_estudio_asignatura_id_fkey" FOREIGN KEY ("asignatura_id") REFERENCES "asignaturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentGroups" ADD CONSTRAINT "_StudentGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentGroups" ADD CONSTRAINT "_StudentGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToPedagogicalResource" ADD CONSTRAINT "_GroupToPedagogicalResource_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToPedagogicalResource" ADD CONSTRAINT "_GroupToPedagogicalResource_B_fkey" FOREIGN KEY ("B") REFERENCES "pedagogical_resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
