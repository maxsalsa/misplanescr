/*
  Warnings:

  - The values [AUDITOR_MEP] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `plan_versions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `planeamientos` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PlanPerfil" AS ENUM ('ACADEMICO', 'TECNICO', 'PRIMARIA');

-- CreateEnum
CREATE TYPE "FaseMediacion" AS ENUM ('INICIO', 'DESARROLLO', 'CIERRE');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('SUPER_ADMIN', 'DOCENTE', 'DOCENTE_TECNICO', 'ESTUDIANTE', 'FAMILIA');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'DOCENTE';
COMMIT;

-- DropForeignKey
ALTER TABLE "plan_versions" DROP CONSTRAINT "plan_versions_planeamiento_id_fkey";

-- DropForeignKey
ALTER TABLE "planeamientos" DROP CONSTRAINT "planeamientos_current_version_id_fkey";

-- DropForeignKey
ALTER TABLE "planeamientos" DROP CONSTRAINT "planeamientos_user_id_fkey";

-- DropTable
DROP TABLE "plan_versions";

-- DropTable
DROP TABLE "planeamientos";

-- DropEnum
DROP TYPE "PlanEstado";

-- DropEnum
DROP TYPE "PlanModalidad";

-- CreateTable
CREATE TABLE "planes" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "asignatura" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "perfil" "PlanPerfil" NOT NULL DEFAULT 'ACADEMICO',
    "valores" TEXT[],
    "ejes_transversales" TEXT[],
    "json_completo" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bloques_curriculares" (
    "id" UUID NOT NULL,
    "plan_id" UUID NOT NULL,
    "resultado_aprendizaje" TEXT NOT NULL,
    "saberes" TEXT[],
    "indicadores" TEXT[],

    CONSTRAINT "bloques_curriculares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mediaciones" (
    "id" UUID NOT NULL,
    "bloque_id" UUID NOT NULL,
    "fase" "FaseMediacion" NOT NULL,
    "tiempo" INTEGER NOT NULL,
    "estrategia" TEXT NOT NULL,
    "accionDocente" TEXT NOT NULL,
    "accionEstudiante" TEXT NOT NULL,

    CONSTRAINT "mediaciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "planes_user_id_idx" ON "planes"("user_id");

-- CreateIndex
CREATE INDEX "planes_asignatura_nivel_idx" ON "planes"("asignatura", "nivel");

-- AddForeignKey
ALTER TABLE "planes" ADD CONSTRAINT "planes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bloques_curriculares" ADD CONSTRAINT "bloques_curriculares_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "planes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediaciones" ADD CONSTRAINT "mediaciones_bloque_id_fkey" FOREIGN KEY ("bloque_id") REFERENCES "bloques_curriculares"("id") ON DELETE CASCADE ON UPDATE CASCADE;
