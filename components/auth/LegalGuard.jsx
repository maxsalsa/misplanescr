"use client";
import { useState, useEffect } from 'react';
import LegalTermsModal from '@/components/auth/LegalTermsModal';
import { logSecurityEvent } from '@/core/security/security-audit';

/**
 * 🛡️ LEGAL GUARD WRAPPER
 * Wraps the entire application. Prevents interaction until T&C are signed.
 */

export default function LegalGuard({ children }) {
    const [accepted, setAccepted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // En producción: chequear session.user.termsAccepted en DB
        const checkStatus = async () => {
            // Simulation
            const hasSigned = localStorage.getItem('MEP_LEGAL_SIGNED') === 'true';
            setAccepted(hasSigned);
            setLoading(false);
        };
        checkStatus();
    }, []);

    const handleAccept = async () => {
        // Call backend to update User record
        await logSecurityEvent('USR-CURRENT', 'TERMS_ACCEPTED', { ip: 'Client-Side' });
        localStorage.setItem('MEP_LEGAL_SIGNED', 'true');
        setAccepted(true);
    };

    if (loading) return null;

    return (
        <>
            {!accepted && <LegalTermsModal onAccept={handleAccept} />}
            <div className={!accepted ? 'blur-sm pointer-events-none' : ''}>
                {children}
            </div>
        </>
    );
}
