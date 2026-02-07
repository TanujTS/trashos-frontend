import { apiClient } from '@/lib/api-client';

export type UserStats = {
    totalKg: string;
    revenue: string;
    name: string;
    joinedDate: string;
};

export type PeriodStats = {
    yearly: string;
    monthly: string;
    weekly: string;
};

export type ImpactStats = {
    recycledItems: number;
    co2Averted: number;
    earned: number;
    treesSaved: number;
};

export const statsService = {
    getUserStats: async (): Promise<UserStats> => {
        const response = await apiClient.get<UserStats>('/api/stats/user');
        return response.data;
    },

    getPeriodStats: async (): Promise<PeriodStats> => {
        const response = await apiClient.get<PeriodStats>('/api/stats/period');
        return response.data;
    },

    getImpactStats: async (): Promise<ImpactStats> => {
        const response = await apiClient.get<ImpactStats>('/api/stats/impact');
        return response.data;
    },
};
