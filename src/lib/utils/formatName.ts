
export interface UserProfile {
    nombre1: string;
    nombre2?: string | null;
    apellido1: string;
    apellido2: string;
    honorific?: string | null;
}

/**
 * Generates the official MEP format name: "APELLIDO1 APELLIDO2 NOMBRE1 NOMBRE2"
 * Standardized in Uppercase for official documents.
 */
export const getOfficialName = (user: UserProfile) => {
    const { apellido1, apellido2, nombre1, nombre2 } = user;
    const fullName = `${apellido1} ${apellido2} ${nombre1} ${nombre2 || ''}`;
    return fullName.trim().toUpperCase().replace(/\s+/g, ' ');
};

/**
 * Generates the Conversational name: "Prof. Max Salazar"
 */
export const getConversationalName = (user: UserProfile) => {
    const { nombre1, apellido1, honorific } = user;
    return `${honorific || ''} ${nombre1} ${apellido1}`.trim();
};
