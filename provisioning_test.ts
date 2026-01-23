import { createPaidUser } from '@/lib/auth/provisioning';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 TEST DE PROVISIONAMIENTO SINPE (SIMULADO)');

    // Datos simulados (Lo que usted llenaría en el formulario Admin)
    const nuevoSuscriptor = {
        nombre1: 'Laura',
        nombre2: 'María',
        apellido1: 'Vargas',
        apellido2: 'Calvo',
        email: `laura.vargas.${Date.now()}@test.cr`, // Email único para no chocar
        honorific: 'Licda.',
        specialty_slots: ['Contabilidad', 'Finanzas']
    };

    const result = await createPaidUser(nuevoSuscriptor);

    if (result.success) {
        console.log('\n🎉 FLUJO EXITOSO');
        console.log(`   1. Admin ingresó datos.`);
        console.log(`   2. Sistema generó clave: ${result.tempPass}`);
        console.log(`   3. Correo enviado a ${nuevoSuscriptor.email}.`);
        console.log(`   4. Flag forcePasswordChange activado.`);

        // Verificación en DB
        const dbUser = await prisma.user.findUnique({ where: { id: result.userId } });
        console.log(`\n🔍 VERIFICACIÓN DB STATUS:`);
        console.log(`   Force Change: ${dbUser?.forcePasswordChange}`);
        console.log(`   Sub Status: ${dbUser?.subscriptionStatus}`);
    } else {
        console.log('💥 FALLO EN PROVISIONAMIENTO');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
