import { apiClient } from '@/lib/api-client';

export type SubmissionStatus = 'pending' | 'classified' | 'failed';

export type Submission = {
    id: string;
    user_id: string;
    image_path_url: string;
    classification?: string;
    resell_value?: string;
    co2_saved?: number;
    resell_places?: string[];
    model_version?: string;
    status: SubmissionStatus;
    created_at: string;
    updated_at: string;
};

export type CreateSubmissionInput = {
    file: File;
};

export type GetSubmissionsParams = {
    page?: number;
    per_page?: number;
    status_filter?: SubmissionStatus;
};

export type SubmissionsResponse = {
    items: Submission[];
    total: number;
    page: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
};

export const submissionsService = {
    create: async (data: CreateSubmissionInput): Promise<Submission> => {
        const formData = new FormData();
        formData.append('file', data.file);

        const response = await apiClient.post<Submission>('/api/submissions/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getAll: async (params?: GetSubmissionsParams): Promise<SubmissionsResponse> => {
        const response = await apiClient.get<SubmissionsResponse>('/api/submissions/', { params });
        return response.data;
    },

    getOne: async (id: string): Promise<Submission> => {
        const response = await apiClient.get<Submission>(`/api/submissions/${id}`);
        return response.data;
    },

    delete: async (id: string): Promise<{ message: string }> => {
        const response = await apiClient.delete<{ message: string }>(`/api/submissions/${id}`);
        return response.data;
    },
};
