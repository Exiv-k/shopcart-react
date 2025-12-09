import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export function useAuthFetch() {
    const { logout, token } = useAuth();
    const navigate = useNavigate();

    return async (url: string, options: RequestInit = {}) => {
        const headers = new Headers(options.headers || {});
        if (token) headers.set('Authorization', `Bearer ${token}`);

        const response  = await fetch(url, {...options, headers});
        if (response.status === 401) {
            logout();
            navigate('/login');
            return Promise.reject(new Error('Token invalid'));
        }

        return response;
    }
}