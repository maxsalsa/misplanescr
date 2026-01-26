import { prisma } from '../prisma';

export async function getPedagogicalContext(searchQuery) {
  try {
    if (!searchQuery) return null;

    const queryClean = searchQuery.trim();
    const keyword = queryClean.split(' ')[0];

    const program = await prisma.studyProgram.findFirst({
      where: {
        subject: { contains: keyword, mode: 'insensitive' }
      },
      include: {
        learningOutcomes: { take: 5 }
      }
    });

    if (!program) return null;

    return 'PROGRAMA OFICIAL MEP:\\n- Asignatura: ' + program.subject + '\\nRESULTADOS:\\n' + program.learningOutcomes.map(lo => '- ' + lo.description).join('\\n');

  } catch (error) {
    console.error('Error DB:', error.message);
    return null;
  }
}
