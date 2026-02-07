"use client";

import React, { createContext, useContext } from 'react';
import { User, LoginInput, RegisterInput } from '@/services/auth';
import { useUser, useLogin, useRegister, useLogout } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (data: LoginInput) => Promise<void>;
    register: (data: RegisterInput) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const { data: user, isLoading: isUserLoading } = useUser();
    const loginMutation = useLogin();
    const registerMutation = useRegister();
    const logoutMutation = useLogout();

    const isLoading = isUserLoading || loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending;

    const login = async (data: LoginInput) => {
        try {
            await loginMutation.mutateAsync(data);
            toast.success('Logged in successfully');
            router.push('/dashboard');
        } catch (error: any) {
            const message = error.response?.data?.detail || 'Login failed';
            toast.error(message);
            throw error;
        }
    };

    const register = async (data: RegisterInput) => {
        try {
            await registerMutation.mutateAsync(data);
            toast.success('Registered successfully');
            router.push('/dashboard');
        } catch (error: any) {
            const detail = error.response?.data?.detail;
            const message = typeof detail === 'string'
                ? detail
                : Array.isArray(detail)
                    ? detail.map((e: any) => e.msg).join(', ')
                    : 'Registration failed';
            toast.error(message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutMutation.mutateAsync();
            toast.success('Logged out successfully');
            router.push('/signin');
        } catch (error: any) {
            toast.error(error.response?.data?.detail || 'Logout failed');
        }
    };

    return (
        <AuthContext.Provider value={{ user: user ?? null, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
