import { apiClient } from '@/lib/api-client';

export type SubmissionStatus = 'pending' | 'classified' | 'failed';

export type Submission = {
    id: string;
    user_id: string;
    image_path_url: string;
    classification: string | null;
    confidence: number | null;
    material_type: string | null;
    recyclable: boolean | null;
    resell_value: number | null;
    co2_saved: number | null;
    resell_places: string[] | null;
    model_version: string | null;
    status: SubmissionStatus;
    created_at: string;
    updated_at: string;
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
    create: async (file: Blob | File): Promise<Submission> => {
        const formData = new FormData();

        // If it's a File, it has a name. If it's a Blob (from camera capture), we need to give it a name.
        if (file instanceof File) {
            formData.append('file', file);
        } else {
            formData.append('file', file, 'capture.jpg');
        }

        const response = await apiClient.post<Submission>('/api/submissions/', formData, {
            headers: {
                'Content-Type': undefined,
            },
        });
        return response.data;
    },

    getAll: async (page = 1, per_page = 10, status_filter?: SubmissionStatus): Promise<SubmissionsResponse> => {
        const params: Record<string, any> = { page, per_page };
        if (status_filter) {
            params.status_filter = status_filter;
        }

        const response = await apiClient.get<SubmissionsResponse>('/api/submissions/', { params });
        return response.data;
    },

    getOne: async (id: string): Promise<Submission> => {
        const response = await apiClient.get<Submission>(`/api/submissions/${id}`);
        return response.data;
    },

    delete: async (id: string): Promise<null> => {
        const response = await apiClient.delete<null>(`/api/submissions/${id}`);
        return response.data;
    },

    getFileUrl: (filename: string) => {
        return `${process.env.NEXT_PUBLIC_API_URL}/api/submissions/files/${filename}`;
    }
};
