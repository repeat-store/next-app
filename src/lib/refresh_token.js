import Cookies from "js-cookie";
import { API_BASE_URL } from "./domen";

const refreshToken = async () => {
    try {
        const refreshToken = Cookies.get('refresh_token');

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await fetch(`${API_BASE_URL}/api/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();

        Cookies.set('access_token', data.access_token);
        Cookies.set('refresh_token', data.refresh_token);

        return data.access_token;
    } catch (error) {
        console.error('Error refreshing token', error);
        return null;
    }
};

export default refreshToken;
