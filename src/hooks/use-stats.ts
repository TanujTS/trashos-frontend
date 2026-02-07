import { useQuery } from '@tanstack/react-query';
import { statsService } from '@/services/stats';

export const useUserStats = () => {
    return useQuery({
        queryKey: ['stats', 'user'],
        queryFn: statsService.getUserStats,
    });
};

export const usePeriodStats = () => {
    return useQuery({
        queryKey: ['stats', 'period'],
        queryFn: statsService.getPeriodStats,
    });
};

export const useImpactStats = () => {
    return useQuery({
        queryKey: ['stats', 'impact'],
        queryFn: statsService.getImpactStats,
    });
};
