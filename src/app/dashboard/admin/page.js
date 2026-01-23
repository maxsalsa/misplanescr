import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-slate-50 p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        🛡️ Panel de Control: Super Admin
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Gestión global de infraestructura y memoria curricular.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        🟢 IA Core: Online
                    </Badge>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                        🧠 Memoria: Sincronizada
                    </Badge>
                </div>
            </div>

            <Separator />

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Docentes Activos</CardTitle>
                        <span className="text-2xl">👥</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">142</div>
                        <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Planes Generados</CardTitle>
                        <span className="text-2xl">📄</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3,592</div>
                        <p className="text-xs text-muted-foreground">Esta semana</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Vectores de Memoria</CardTitle>
                        <span className="text-2xl">🧩</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85,201</div>
                        <p className="text-xs text-muted-foreground">Última ingesta: 21 Ene</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Estado API</CardTitle>
                        <span className="text-2xl">⚡</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">Optimo</div>
                        <p className="text-xs text-muted-foreground">Latencia: 1.2s</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Actions Area */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Memory Management */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>🧠 Gestión de Memoria MEP</CardTitle>
                        <CardDescription>Control directo sobre el RAG Engine y Documentos.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono text-sm">
                            &gt; System check... OK<br />
                            &gt; Detected 25 new PDFs<br />
                            &gt; Ready to ingest.
                        </div>
                        <div className="flex gap-4">
                            <Button className="w-full bg-slate-900 hover:bg-slate-800">
                                🔄 Re-entrenar CEREBRO (Full)
                            </Button>
                            <Button variant="outline" className="w-full">
                                📂 Ver Catálogo PDF
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Right: User Roles & Audit */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>👮 Auditoría y Seguridad</CardTitle>
                        <CardDescription>Logs de actividad y control de roles.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm p-2 bg-slate-100 rounded">
                                <span>🔴 Intento de acceso no autorizado (IP 192.168.1.5)</span>
                                <span className="text-xs text-slate-500">Hace 5 min</span>
                            </div>
                            <div className="flex justify-between items-center text-sm p-2 bg-slate-100 rounded">
                                <span>🟢 Docente Maria R. generó Plan (Ciencias)</span>
                                <span className="text-xs text-slate-500">Hace 12 min</span>
                            </div>
                            <div className="flex justify-between items-center text-sm p-2 bg-slate-100 rounded">
                                <span>🟢 Docente Carlos M. generó Quiz (Matemáticas)</span>
                                <span className="text-xs text-slate-500">Hace 18 min</span>
                            </div>
                        </div>
                        <Button variant="destructive" className="w-full mt-4">
                            🔒 Bloquear Sistema (Modo Pánico)
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
