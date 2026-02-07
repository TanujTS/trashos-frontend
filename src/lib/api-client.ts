import axios from 'axios';

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // direct calls to backend (cookies need cross-origin)
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // On 401, redirect to login (unless already on auth pages)
        if (
            error.response?.status === 401 &&
            typeof window !== 'undefined' &&
            !window.location.pathname.startsWith('/signin') &&
            !window.location.pathname.startsWith('/signup')
        ) {
            // Let React Query handle the error — don't force redirect here
            // The auth provider / middleware already handle redirects
        }
        return Promise.reject(error);
    }
);
