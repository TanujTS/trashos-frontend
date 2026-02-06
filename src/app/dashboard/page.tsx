"use client";

import Header from "@/components/header";
import PeriodCards from "@/components/period-card";
import ActivityItem from "@/components/activity-item";
import StatsCard from "@/components/stats-card";
import { IoCameraOutline } from "react-icons/io5";
import { usePeriodStats, useUserStats } from "@/hooks/use-stats";
import { useSubmissions } from "@/hooks/use-submissions";
import { format } from "date-fns";

export default function Dashboard() {
    // API Hooks
    const { data: stats } = useUserStats();
    const { data: periods } = usePeriodStats();
    const { data: submissions } = useSubmissions({ page: 1, per_page: 5 }); // Get recent 5 submissions

    // Fallbacks if data is loading or missing
    const defaultStats = {
        totalKg: "---",
        revenue: "---",
        name: "User",
        joinedDate: "---",
    };

    const defaultPeriods = {
        yearly: "0",
        monthly: "0",
        weekly: "0",
    };

    const displayStats = stats || defaultStats;
    const displayPeriods = periods || defaultPeriods;

    return (
        <div className="min-h-screen bg-background px-4 pt-6 pb-28 font-sans">
            {/* Header */}
            <Header name={displayStats.name} />

            <button className="absolute top-24 right-4 bg-primary text-foreground px-6 py-2 rounded-full flex items-center gap-2 text-sm font-medium border-1 border-foreground">
                <IoCameraOutline size={18} />
                Scan now
            </button>


            <StatsCard
                totalKg={displayStats.totalKg}
                revenue={displayStats.revenue}
                name={displayStats.name}
                joinedDate={displayStats.joinedDate}
            />


            <PeriodCards
                yearly={displayPeriods.yearly}
                monthly={displayPeriods.monthly}
                weekly={displayPeriods.weekly}
            />


            <div className="mt-8">
                <h3 className="mb-3 font-semibold text-foreground">Recent Activity</h3>

                <div className="rounded-2xl bg-card p-3">
                    {submissions?.items && submissions.items.length > 0 ? (
                        submissions.items.map((submission) => (
                            <ActivityItem
                                key={submission.id}
                                item={submission.classification?.replace('_', ' ') || "Recycled Item"}
                                date={format(new Date(submission.created_at), "EEEE, d MMM yyyy")}
                            />
                        ))
                    ) : (
                        <div className="p-4 text-center text-foreground/50 text-sm">
                            No recent activity found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
