"use client";

/**
 * Header principal del sistema AulaPlan CR.
 *
 * Responsabilidades:
 * - Mostrar barra superior de navegación del dashboard.
 * - Permitir acceso al menú lateral en dispositivos móviles.
 * - Mostrar información del usuario autenticado.
 * - Proveer acceso rápido a perfil, suscripción y cierre de sesión.
 *
 * Accesibilidad:
 * - Incluye roles semánticos.
 * - Soporta navegación por teclado.
 * - Incluye labels accesibles para lectores de pantalla.
 *
 * Seguridad:
 * - No expone datos sensibles más allá de email y nombre.
 * - El logout debe invalidar correctamente la sesión en el AuthProvider.
 *
 * Futuro:
 * - Aquí se puede agregar:
 *   - Notificaciones reales
 *   - Estado de sincronización
 *   - Alertas de seguridad
 *
 * @module components/layout/Header
 */

import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header
      role="banner"
      className="navbar bg-base-100 shadow-sm px-4"
      aria-label="Barra superior de navegación"
    >
      {/* Botón de menú móvil */}
      <div className="flex-none lg:hidden">
        <label
          htmlFor="sidebar-drawer"
          className="btn btn-ghost btn-circle drawer-button"
          aria-label="Abrir menú lateral"
          title="Abrir menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>

      {/* Título / bienvenida */}
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-base-content hidden md:block">
          Bienvenido, <span className="sr-only">usuario</span> {user?.name}
        </h1>
      </div>

      {/* Acciones rápidas */}
      <div className="flex-none gap-2">
        {/* Notificaciones (placeholder) */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            aria-label="Ver notificaciones"
            title="Notificaciones"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                className="badge badge-xs badge-primary indicator-item"
                aria-hidden="true"
              ></span>
            </div>
          </label>
        </div>

        {/* Menú de usuario */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar placeholder"
            aria-label="Abrir menú de usuario"
            title="Cuenta de usuario"
          >
            <div className="bg-primary text-primary-content rounded-full w-10">
              <span className="text-sm" aria-hidden="true">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
          </label>

          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            role="menu"
            aria-label="Opciones de usuario"
          >
            <li className="menu-title">
              <span>{user?.email}</span>
            </li>
            <li role="menuitem">
              <Link href="/dashboard/perfil">Mi Perfil</Link>
            </li>
            <li role="menuitem">
              <Link href="/dashboard/suscripcion">Mi Suscripción</Link>
            </li>
            <li className="divider" role="separator"></li>
            <li role="menuitem">
              <button
                onClick={logout}
                className="text-error"
                aria-label="Cerrar sesión"
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
