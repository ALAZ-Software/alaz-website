'use client';

import React, { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
    const { isAuthed } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthed) router.replace(redirectTo);
    }, [isAuthed, redirectTo, router]);

    if (!isAuthed) return null;

    return children;
}

export default ProtectedRoute;

export { ProtectedRoute };
