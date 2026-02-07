import { apiClient } from '@/lib/api-client';

export type User = {
    id: string;
    email: string;
    username: string;
    role: string;
};

export type RegisterInput = {
    email: string;
    username: string;
    password: string;
};

export type LoginInput = {
    username: string; // accepts username OR email
    password: string;
};

export const authService = {
    register: async (data: RegisterInput): Promise<User> => {
        const response = await apiClient.post<User>('/api/auth/register', data);
        return response.data;
    },

    login: async (data: LoginInput): Promise<User> => {
        const formData = new URLSearchParams();
        formData.append('username', data.username);
        formData.append('password', data.password);

        const response = await apiClient.post<User>('/api/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    },

    getMe: async (): Promise<User> => {
        const response = await apiClient.get<User>('/api/auth/me');
        return response.data;
    },

    logout: async (): Promise<{ message: string }> => {
        const response = await apiClient.post<{ message: string }>('/api/auth/logout');
        return response.data;
    },
};
