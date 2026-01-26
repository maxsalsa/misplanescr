-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'DOCENTE', 'DOCENTE_TECNICO', 'ESTUDIANTE', 'FAMILIA', 'AUDITOR_MEP');

-- CreateEnum
CREATE TYPE "PlanModalidad" AS ENUM ('ACADEMICO', 'TECNICO_CTP', 'NOCTURNO', 'IPEC', 'CINDEA', 'PRIMARIA', 'PREESCOLAR');

-- CreateEnum
CREATE TYPE "PlanEstado" AS ENUM ('BORRADOR', 'REVISION', 'APROBADO', 'OBSOLETO');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cedula" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'DOCENTE',
    "plan" TEXT NOT NULL DEFAULT 'demo',
    "status" TEXT NOT NULL DEFAULT 'activo',
    "phone_number" TEXT,
    "mep_email" TEXT,
    "last_login" TIMESTAMP(3),
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "planeamientos_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planeamientos" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "asignatura" TEXT NOT NULL,
    "institucion" TEXT NOT NULL,
    "modalidad" "PlanModalidad" NOT NULL DEFAULT 'ACADEMICO',
    "nivel" TEXT NOT NULL,
    "seccion" TEXT,
    "especialidad" TEXT,
    "periodo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL DEFAULT 2026,
    "current_version_id" UUID,
    "estado" "PlanEstado" NOT NULL DEFAULT 'BORRADOR',
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "content" JSONB,
    "pdf_url" VARCHAR(512),

    CONSTRAINT "planeamientos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_versions" (
    "id" UUID NOT NULL,
    "planeamiento_id" UUID NOT NULL,
    "version_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL DEFAULT 'MOTOR_V31',
    "checkSum" TEXT,
    "edited_by" TEXT,
    "encabezado" JSONB NOT NULL,
    "columnas" JSONB NOT NULL,
    "mediacion" JSONB NOT NULL,
    "reflexion" TEXT,

    CONSTRAINT "plan_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grade_books" (
    "id" UUID NOT NULL,
    "teacher_id" UUID NOT NULL,
    "subject" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "component" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "grade_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grade_entries" (
    "id" UUID NOT NULL,
    "grade_book_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "comments" TEXT,

    CONSTRAINT "grade_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conduct_reports" (
    "id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "teacher_id" UUID NOT NULL,
    "infraction" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "article_rea" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending_signature',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_group_guide" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "conduct_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidence_portfolio" (
    "id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "indicator" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "format" TEXT,
    "comment" TEXT,
    "achievementLevel" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evidence_portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_links" (
    "id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "parent_id" UUID NOT NULL,
    "relationship" TEXT NOT NULL,

    CONSTRAINT "family_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meetings" (
    "id" UUID NOT NULL,
    "teacher_id" UUID NOT NULL,
    "parent_id" UUID NOT NULL,
    "student_name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "type" TEXT NOT NULL DEFAULT 'presencial',
    "virtual_link" TEXT,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_achievements" (
    "id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon_url" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "awarded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "awarded_by" TEXT,

    CONSTRAINT "student_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educational_resources" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "type" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "tags" TEXT[],
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "educational_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "plan" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "auto_renew" BOOLEAN NOT NULL DEFAULT true,
    "stripe_subscription_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "action" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL,
    "resource_id" TEXT,
    "metadata" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_mep" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "url_archivo" TEXT NOT NULL,
    "asignatura" TEXT NOT NULL,
    "ano_vigencia" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documentos_mep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cedula_key" ON "users"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "users_mep_email_key" ON "users"("mep_email");

-- CreateIndex
CREATE UNIQUE INDEX "planeamientos_current_version_id_key" ON "planeamientos"("current_version_id");

-- CreateIndex
CREATE INDEX "planeamientos_modalidad_nivel_asignatura_ano_idx" ON "planeamientos"("modalidad", "nivel", "asignatura", "ano");

-- CreateIndex
CREATE INDEX "planeamientos_user_id_idx" ON "planeamientos"("user_id");

-- CreateIndex
CREATE INDEX "planeamientos_created_at_idx" ON "planeamientos"("created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "plan_versions_planeamiento_id_version_number_key" ON "plan_versions"("planeamiento_id", "version_number");

-- CreateIndex
CREATE UNIQUE INDEX "family_links_student_id_parent_id_key" ON "family_links"("student_id", "parent_id");

-- AddForeignKey
ALTER TABLE "planeamientos" ADD CONSTRAINT "planeamientos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planeamientos" ADD CONSTRAINT "planeamientos_current_version_id_fkey" FOREIGN KEY ("current_version_id") REFERENCES "plan_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_versions" ADD CONSTRAINT "plan_versions_planeamiento_id_fkey" FOREIGN KEY ("planeamiento_id") REFERENCES "planeamientos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_books" ADD CONSTRAINT "grade_books_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_entries" ADD CONSTRAINT "grade_entries_grade_book_id_fkey" FOREIGN KEY ("grade_book_id") REFERENCES "grade_books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_entries" ADD CONSTRAINT "grade_entries_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conduct_reports" ADD CONSTRAINT "conduct_reports_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conduct_reports" ADD CONSTRAINT "conduct_reports_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence_portfolio" ADD CONSTRAINT "evidence_portfolio_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_links" ADD CONSTRAINT "family_links_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_links" ADD CONSTRAINT "family_links_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educational_resources" ADD CONSTRAINT "educational_resources_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
