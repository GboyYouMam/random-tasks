import limiter from './rateLimiter';

// getting api etc form .env (safe lol)
const IP_API = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

// fetching data from API
export async function fetchIPData(ipAddress) {
    if (!ipAddress) throw new Error('IP address is required');

    // Перевірка rate limit
    if (!limiter.tryRemoveToken()) {
        const err = new Error('Rate limit exceeded. Please wait a moment and try again.');
        err.code = 'RATE_LIMIT';
        throw err;
    }

    // getting it
    const url = `${API_URL}${ipAddress}?access_key=${IP_API}`;

    console.log('Fetching:', url); // for debug

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching IP data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response data:', data); // for debug

    return data;
}