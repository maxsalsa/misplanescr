import { execSync, spawn } from 'child_process';
const isWin = process.platform === "win32";
const PORT = 3000;

console.log(`\n🦅 [ANTIGRAVITY] Asegurando puerto ${PORT} para inicio limpio...`);

try {
    if (isWin) {
        try {
            // Encontrar PID
            const output = execSync(`netstat -ano | findstr :${PORT}`).toString();
            const lines = output.trim().split('\n').filter(l => l.includes('LISTENING'));

            if (lines.length > 0) {
                // El PID es el último token de la línea
                lines.forEach(line => {
                    const parts = line.trim().split(/\s+/);
                    const pid = parts[parts.length - 1];
                    if (pid && parseInt(pid) > 0) {
                        console.log(`⚠️  Puerto ocupado por PID ${pid}. Liberando...`);
                        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
                    }
                });
                console.log("✅ Puerto liberado con éxito.");
            } else {
                console.log("✅ Puerto libre.");
            }
        } catch (e) {
            // netstat falla si no encuentra nada, lo cual es bueno
            console.log("✅ Puerto libre (Sin procesos detectados).");
        }
    } else {
        // Fallback Mac/Linux
        try {
            execSync(`lsof -t -i:${PORT} | xargs kill -9`, { stdio: 'ignore' });
        } catch (e) { }
    }
} catch (e) {
    console.log("⚠️  Nota: No se pudo limpiar el puerto automáticamente (puede que ya esté libre).");
}

console.log("🚀 Iniciando Motor AutoPlanea MEP...\n");

// Spawn Next.js
const next = spawn('next', ['dev', '-p', `${PORT}`], { stdio: 'inherit', shell: true });

next.on('close', (code) => {
    process.exit(code);
});
