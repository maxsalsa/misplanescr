"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { hash, compare } from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updatePasswordAction(currentPassword, newPassword) {
    try {
        const session = await auth();
        if (!session?.user?.email) return { success: false, error: "No autorizado" };

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user || user.password === "google-auth-placeholder") {
            return { success: false, error: "Usuarios de Google no pueden cambiar contraseña aquí." };
        }

        const isValid = await compare(currentPassword, user.password);
        if (!isValid) return { success: false, error: "La contraseña actual es incorrecta." };

        const hashedPassword = await hash(newPassword, 12);

        await prisma.user.update({
            where: { email: session.user.email },
            data: { password: hashedPassword }
        });

        return { success: true };
    } catch (error) {
        console.error("Password Update Error:", error);
        return { success: false, error: "Error interno al actualizar credenciales." };
    }
}

export async function addInstitutionAction(institutionName) {
    // V1: Store as JSON in a new 'institutions' field or just log it for now since we don't have the table yet.
    // For "Protocol V16", we'll implement a "Constitution" mode later.
    // Ideally we update a JSON field. Let's check if User has a metadata field.
    // Schema doesn't have it. We will just simulate success for the UI demo or added it to separate model.
    // RETURNING MOCK SUCCESS FOR UI BUILD
    return { success: true, message: "Institución vinculada (Simulación V1)" };
}

export async function getUserProfileAction() {
    const session = await auth();
    if (!session?.user?.email) return null;

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { name: true, email: true, role: true, subscriptionPlan: true }
    });
    return user;
}
