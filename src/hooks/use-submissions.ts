import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    submissionsService,
    CreateSubmissionInput,
    GetSubmissionsParams
} from '@/services/submissions';

export const useSubmissions = (params?: GetSubmissionsParams) => {
    return useQuery({
        queryKey: ['submissions', params],
        queryFn: () => submissionsService.getAll(params),
    });
};

export const useSubmission = (id: string) => {
    return useQuery({
        queryKey: ['submission', id],
        queryFn: () => submissionsService.getOne(id),
        enabled: !!id,
    });
};

export const useCreateSubmission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateSubmissionInput) => submissionsService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
        },
    });
};

export const useDeleteSubmission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => submissionsService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
        },
    });
};
