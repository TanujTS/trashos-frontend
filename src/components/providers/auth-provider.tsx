'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useUser } from '@/hooks/use-auth';
import { User } from '@/services/auth';

type AuthContextType = {
    user: User | undefined;
    isLoading: boolean;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: user, isLoading } = useUser();

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
