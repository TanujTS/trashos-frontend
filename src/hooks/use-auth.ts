import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, LoginInput, RegisterInput, User } from '@/services/auth';

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: authService.getMe,
        retry: false,
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginInput) => authService.login(data),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user);
        },
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RegisterInput) => authService.register(data),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user);
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
            queryClient.clear();
        },
    });
};
