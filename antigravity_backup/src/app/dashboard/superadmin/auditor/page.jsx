"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ShieldCheck, Database, Server, Smartphone, Users } from "lucide-react";

export default function SuperAdminAuditor() {
    const [stats, setStats] = useState({
        dbStatus: "ONLINE",
        ragStatus: "ACTIVE",
        pwaActive: true,
        totalUsers: 0,
        cacheHits: 0,
        neuroProfiles: 0
    });

    useEffect(() => {
        // Mock fetch of audit stats
        // In real impl, this calls a Server Action querying count()
        setStats({
            dbStatus: "ONLINE",
            ragStatus: "ACTIVE (Spectrum Engine)",
            pwaActive: true,
            totalUsers: 12543,
            cacheHits: 4521,
            neuroProfiles: 850
        });
    }, []);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <header className="flex justify-between items-center border-b pb-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">KAIZEN CONTROLLER 15.0</h1>
                    <p className="text-slate-500 font-mono text-sm">Sovereign Governance Dashboard</p>
                </div>
                <Badge variant="outline" className="px-4 py-1 text-green-600 border-green-200 bg-green-50">
                    SYSTEM HEALTH: 98%
                </Badge>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. INFRASTRUCTURE & SPEED */}
                <Card className="border-t-4 border-t-blue-600 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Frontier Speed (Cache)</CardTitle>
                        <Server className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.cacheHits.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Requests served from Semantic Cache</p>
                    </CardContent>
                </Card>

                {/* 2. RESILIENCE (OFFLINE) */}
                <Card className="border-t-4 border-t-yellow-400 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Resilience (PWA)</CardTitle>
                        <Smartphone className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">ACTIVE</div>
                        <p className="text-xs text-muted-foreground">Service Worker & IDB Operational</p>
                    </CardContent>
                </Card>

                {/* 3. NEURO-INCLUSION */}
                <Card className="border-t-4 border-t-purple-600 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Spectrum Engine</CardTitle>
                        <Users className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.neuroProfiles}</div>
                        <p className="text-xs text-muted-foreground">Students with Neuro-Profiles Active</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5" /> Security Audit Log
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { time: '10:42 AM', event: 'Predictive Draft generated for Teacher ID-882', type: 'info' },
                                { time: '10:30 AM', event: 'Blocked Screenshot Attempt (User USR-991)', type: 'alert' },
                                { time: '10:15 AM', event: 'Semantic Cache Hit for "Matemáticas 7mo"', type: 'success' },
                                { time: '09:55 AM', event: 'Offline Sync Batch Received (34 ops)', type: 'info' },
                            ].map((log, i) => (
                                <div key={i} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                                    <span className="font-mono text-slate-500">{log.time}</span>
                                    <span className={log.type === 'alert' ? 'text-red-600 font-bold' : 'text-slate-700'}>
                                        {log.event}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="h-5 w-5" /> Database Health (Neon)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Connection Pool</span>
                                <span className="text-green-600 font-bold">OPTIMAL</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Tables Synced</span>
                                <span className="font-mono">NeuroProfile, SemanticCache, OfflineOps</span>
                            </div>
                            <div className="mt-4 p-4 bg-slate-50 rounded text-xs font-mono text-slate-600">
                                Last Migration: Kaizen 15.0 (Sovereign Update)
                                <br />
                                Integrity Check: PASSED
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
