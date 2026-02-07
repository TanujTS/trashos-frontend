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
    wasteGenerated: number; // kg
    fuelSaved: number; // L
};

export const statsService = {
    getUserStats: async (): Promise<UserStats> => {
        // TODO: Replace with actual API call when backend is ready
        // const response = await apiClient.get<UserStats>('/api/stats/user');
        // return response.data;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    totalKg: "20.56",
                    revenue: "2,546",
                    name: "Name",
                    joinedDate: "6/02/2026",
                });
            }, 500);
        });
    },

    getPeriodStats: async (): Promise<PeriodStats> => {
        // TODO: Replace with actual API call when backend is ready
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    yearly: "40",
                    monthly: "18",
                    weekly: "6",
                });
            }, 500);
        });
    },

    getImpactDetails: async (): Promise<ImpactDetails> => {
        // TODO: Replace with actual API call when backend is ready
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    recycledItems: 12,
                    co2Averted: 0.5,
                    earned: 200.4,
                    treesSaved: 0.8,
                    wasteGenerated: 4.3,
                    fuelSaved: 13.7
                });
            }, 500);
        });
    }
};
