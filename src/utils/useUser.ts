import { useMemo } from 'react';
import { useAuth } from './AuthContext';
import { decodeJwt } from './JWTDecoder';
import type { Role } from './JWTDecoder';

export type User = {
    username: string;
    role: Role;
    last_login: string;
}

export function useUser() {
    const { token } = useAuth();
    const user: User | null = useMemo(() => {
        if (!token) return null;
        const payload = decodeJwt(token);
        if (!payload) return null;

        const username = (payload.username as string)
        if (!username) return null;

        const roles = payload.roles as Role[];
        const role = roles[0];
        const last_login = "";

        return { username, role, last_login };
    }, [token]);

    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'ADMIN';

    return {user, isAuthenticated, isAdmin};
}