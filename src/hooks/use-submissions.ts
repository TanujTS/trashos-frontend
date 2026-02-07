import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { submissionsService, SubmissionStatus } from '@/services/submissions';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useSubmissions = (page = 1, per_page = 10, status_filter?: SubmissionStatus) => {
    return useQuery({
        queryKey: ['submissions', page, per_page, status_filter],
        queryFn: () => submissionsService.getAll(page, per_page, status_filter),
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
        mutationFn: (file: Blob) => submissionsService.create(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
            toast.success('Submission created successfully');
        },
        onError: (error: AxiosError<{ detail?: string | any[] }>) => {
            const detail = error.response?.data?.detail;
            let message = 'Failed to create submission';

            if (typeof detail === 'string') {
                message = detail;
            } else if (Array.isArray(detail)) {
                // If it's a validation error array, join the messages
                message = detail.map((err: any) => err.msg).join(', ');
            }

            toast.error(message);
        },
    });
};

export const useDeleteSubmission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => submissionsService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
            toast.success('Submission deleted successfully');
        },
        onError: (error: AxiosError<{ detail?: string }>) => {
            toast.error(error.response?.data?.detail || 'Failed to delete submission');
        },
    });
};
