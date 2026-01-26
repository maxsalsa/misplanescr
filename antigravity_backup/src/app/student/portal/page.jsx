
import PortalEvidenciasEstudiante from '@/components/features/student/PortalEvidenciasEstudiante';

export const metadata = {
    title: 'Portal Estudiante | AulaPlan',
    description: 'Sube tus evidencias y construye tu portafolio.',
}

export default function StudentPortalPage() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <PortalEvidenciasEstudiante />
        </div>
    );
}
