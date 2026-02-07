import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, LoginInput, RegisterInput, User } from '@/services/auth';

export const userQueryKey = ['user'] as const;

export const useUser = () => {
    return useQuery<User | null>({
        queryKey: userQueryKey,
        queryFn: async () => {
            try {
                return await authService.getMe();
            } catch {
                return null;
            }
        },
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes — avoid refetching on every mount
        refetchOnWindowFocus: true,
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginInput) => authService.login(data),
        onSuccess: (user) => {
            queryClient.setQueryData(userQueryKey, user);
        },
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RegisterInput) => authService.register(data),
        onSuccess: (user) => {
            queryClient.setQueryData(userQueryKey, user);
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            queryClient.setQueryData(userQueryKey, null);
            queryClient.removeQueries(); // clear all cached data on logout
        },
    });
};
