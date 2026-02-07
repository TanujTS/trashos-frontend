import { useQuery } from '@tanstack/react-query';
import { statsService } from '@/services/stats';
import { submissionsService, Submission } from '@/services/submissions';
import { format, subDays } from 'date-fns';

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

export const useCO2History = (period: 'Weekly' | 'Monthly' | 'Yearly') => {
    return useQuery({
        queryKey: ['stats', 'history', period],
        queryFn: async () => {
            // Fetch recent submissions (100 should be enough for recent history)
            const response = await submissionsService.getAll(1, 100, 'classified');
            const submissions = response.items;

            const now = new Date();
            const data: { label: string; value: number; date: Date }[] = [];

            if (period === 'Weekly') {
                // Last 7 days
                for (let i = 6; i >= 0; i--) {
                    const date = subDays(now, i);
                    const label = format(date, 'EEE'); // Mon, Tue...
                    let value = 0;

                    submissions.forEach((sub: Submission) => {
                        const subDate = new Date(sub.created_at);
                        if (format(subDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
                            value += (sub.co2_saved || 0);
                        }
                    });

                    data.push({ label, value: Math.round(value), date });
                }
            } else if (period === 'Monthly') {
                // Last 30 days, grouped by 3-day intervals or just daily? 
                // Let's do last 6 chunks of 5 days or similar? 
                // Or simple daily for last 10 days? 
                // Let's do last 7 days for "Monthly" view in this context usually means 'This Month' breakdown?
                // Standard usually: Last 30 days is too crowded for labels.
                // Let's do last 4 weeks.
                // Actually, let's stick to a simpler "Last 7 entries" style for now or just daily for last 7 days is same as weekly.
                // Let's do "Month" = Group by Week? 

                // Strategy: Last 4 weeks
                for (let i = 3; i >= 0; i--) {
                    const weekStart = subDays(now, (i * 7) + 6);
                    const weekEnd = subDays(now, i * 7);
                    const label = `${format(weekStart, 'd MMM')}`; // 12 Jan

                    let value = 0;
                    submissions.forEach((sub: Submission) => {
                        const subDate = new Date(sub.created_at);
                        if (subDate >= weekStart && subDate <= weekEnd) {
                            value += (sub.co2_saved || 0);
                        }
                    });
                    data.push({ label, value: Math.round(value), date: weekStart });
                }

            } else if (period === 'Yearly') {
                // Last 6 months
                for (let i = 5; i >= 0; i--) {
                    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
                    const label = format(date, 'MMM'); // Jan, Feb...
                    let value = 0;

                    submissions.forEach((sub: Submission) => {
                        const subDate = new Date(sub.created_at);
                        if (subDate.getMonth() === date.getMonth() && subDate.getFullYear() === date.getFullYear()) {
                            value += (sub.co2_saved || 0);
                        }
                    });

                    data.push({ label, value: Math.round(value), date });
                }
            }

            return data;
        },
    });
};
