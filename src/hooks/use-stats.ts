import { useQuery } from '@tanstack/react-query';
import { statsService } from '@/services/stats';

export const useUserStats = () => {
    return useQuery({
        queryKey: ['userStats'],
        queryFn: statsService.getUserStats,
    });
};

export const usePeriodStats = () => {
    return useQuery({
        queryKey: ['periodStats'],
        queryFn: statsService.getPeriodStats,
    });
};

export const useImpactDetails = () => {
    return useQuery({
        queryKey: ['impactDetails'],
        queryFn: statsService.getImpactDetails,
    });
};
