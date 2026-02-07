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

// Types for the Statistics Page
export type ImpactDetails = {
    recycledItems: number;
    co2Averted: number; // tonnes
    earned: number;   // INR
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

    getImpactDetails: async (): Promise<ImpactDetails> => {
        const response = await apiClient.get<ImpactDetails>('/api/stats/impact');
        return response.data;
    }
};
