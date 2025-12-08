import { useMemo } from 'react';
import { useAuth } from './AuthContext';
import { decodeJwt } from './JWTDecoder';
import type { Role } from './JWTDecoder';

export type User = {
    username: string;
    role: Role;
}

export function useUser() {
    const { token } = useAuth();
    const user: User | null = useMemo(() => {
        if (!token) return null;
        const payload = decodeJwt(token);
        if (!payload) return null;

        const username = (payload.username as string)
        if (!username) return null;

        const role = payload.role as Role ?? 'USER';

        return { username, role };
    }, [token]);

    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'ADMIN';

    return {user, isAuthenticated, isAdmin};
}