// 🔐 ANTIGRAVITY ROLE SYSTEM (RBAC)
// Industrial Grade Permission/Role Definitions

export const ROLES = {
  SUPER_ADMIN: "admin",
  TEACHER: "teacher-active",
  TEACHER_PENDING: "teacher-pending",
  STUDENT: "student",
  GUEST: "guest",
};

export const PERMISSIONS = {
  CAN_GENERATE_PLAN: [ROLES.SUPER_ADMIN, ROLES.TEACHER],
  CAN_DOWNLOAD_PDF: [ROLES.SUPER_ADMIN, ROLES.TEACHER], // Premium Check handling separately
  CAN_MANAGE_LICENSES: [ROLES.SUPER_ADMIN],
  CAN_VIEW_DASHBOARD: [
    ROLES.SUPER_ADMIN,
    ROLES.TEACHER,
    ROLES.STUDENT,
    ROLES.TEACHER_PENDING,
  ], // Pending sees limited view
};

export const isSuperAdmin = (user) => user?.role === ROLES.SUPER_ADMIN;
export const isPremium = (user) => user?.isPremium || isSuperAdmin(user);
