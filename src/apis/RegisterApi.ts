const api_path = import.meta.env.VITE_API_BASE;
import axios from 'axios';

export async function register(username: string, password: string): Promise<void> {
    try {
        await axios.post(`${api_path}/api/register`, {
            username: username,
            password: password
        })
    } catch (e: any) {
        if (e.response && e.response.status === 409) {
            throw new Error("Username already taken");
        }
        throw new Error("Registration failed");
    }
}