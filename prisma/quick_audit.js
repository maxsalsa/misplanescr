const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
    try {
        const total = await prisma.syllabus.count();
        const pdfs = await prisma.syllabus.count({ where: { period: "Importado" } });
        const usuarios = await prisma.user.count();
        
        console.log(`      📊 Total Registros MEP: ${total}`);
        console.log(`      📄 PDFs Indexados:      ${pdfs}`);
        console.log(`      👤 Usuarios:            ${usuarios}`);
        
        if(total < 100) console.log("      ⚠️ ADVERTENCIA: Pocos datos. ¿Se corrió el seed?");
        else console.log("      ✅ Volumen de datos: SALUDABLE.");
        
    } catch(e) { console.error("      ❌ ERROR DB:", e.message); }
}
main().finally(()=>prisma.$disconnect());