"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

/**
 * Server Action for Zero-Trust Login
 * @param {string|undefined} prevState - State from useFormState
 * @param {FormData} formData - Form input data
 */
export async function authenticate(prevState, formData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales inválidas. Verifique su correo y contraseña.";
        default:
          return "Error de autenticación. Intente nuevamente.";
      }
    }
    throw error;
  }
}
