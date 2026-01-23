"use client"

import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import { toast } from 'sonner'

export function NotificationRequest() {
    const [permission, setPermission] = useState<NotificationPermission>('default')

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission)
        }
    }, [])

    const requestAccess = async () => {
        if (!('Notification' in window)) return

        const result = await Notification.requestPermission()
        setPermission(result)

        if (result === 'granted') {
            toast.success('Notificaciones Activas', {
                description: 'Recibirás alertas de pagos SINPE en tiempo real.',
                icon: <Bell className="w-5 h-5 text-green-500" />
            })
            new Notification('Antigravity Conectado', {
                body: 'Sistema listo para recibir alertas de pago.',
                icon: '/favicon.ico'
            })
        }
    }

    if (permission === 'granted' || permission === 'denied') return null

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-xl shadow-2xl border border-indigo-100 flex items-center gap-4 animate-in slide-in-from-bottom-5">
            <div className="bg-indigo-100 p-2 rounded-full">
                <Bell className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
                <h4 className="font-bold text-sm text-slate-800">Alertas de Pagos</h4>
                <p className="text-xs text-slate-500">¿Deseas saber cuándo pagan en tiempo real?</p>
            </div>
            <button
                onClick={requestAccess}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-2 rounded-lg font-bold transition-colors"
            >
                Activar
            </button>
        </div>
    )
}
