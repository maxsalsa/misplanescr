/**
 * Genera el filtro WHERE para Prisma basado en el rol del usuario.
 * @param {Object} session - Objeto de sesión de NextAuth (req.session.user)
 * @returns {Object} Clausula where parcial
 */
export function getPermissions(session) {
  if (!session || !session.user) {
    throw new Error("Unauthorized: No session provided");
  }

  const role = session.user.role;

  // GOD_TIER y DIRECTOR ven todo (por ahora, luego DIRECTOR se limita a SchoolId)
  if (role === "GOD_TIER" || role === "DIRECTOR") {
    return {};
  }

  // DOCENTE: Solo ve lo suyo
  if (role === "DOCENTE") {
    return { userId: session.user.id };
  }

  // Default: Bloquear todo (Safety First)
  return { userId: "NO_ACCESS" };
}
