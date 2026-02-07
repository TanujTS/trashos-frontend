"use client";

import Header from "@/components/header";
import PeriodCards from "@/components/period-card";
import ActivityItem from "@/components/activity-item";
import StatsCard from "@/components/stats-card";
import Navbar from "@/components/navbar";
import { IoCameraOutline } from "react-icons/io5";
import { usePeriodStats, useUserStats } from "@/hooks/use-stats";
import { useSubmissions } from "@/hooks/use-submissions";
import { format } from "date-fns";
import Link from "next/link";

export default function Dashboard() {
    // API Hooks
    const { data: stats } = useUserStats();
    const { data: periods } = usePeriodStats();
    const { data: submissions } = useSubmissions(1, 5); // Get recent 5 submissions

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

    // Safely map API data to display format
    const displayStats = {
        totalKg: stats?.totalKg?.toString() || defaultStats.totalKg,
        revenue: stats?.revenue?.toString() || defaultStats.revenue,
        name: stats?.name || defaultStats.name,
        joinedDate: stats?.joinedDate || defaultStats.joinedDate,
    };

    const displayPeriods = {
        yearly: periods?.yearly?.toString() || defaultPeriods.yearly,
        monthly: periods?.monthly?.toString() || defaultPeriods.monthly,
        weekly: periods?.weekly?.toString() || defaultPeriods.weekly,
    };

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
                        submissions.items.map((submission: any) => (
                            <Link key={submission.id} href={`/submissions/${submission.id}`} className="block">
                                <ActivityItem
                                    item={submission.classification?.replace('_', ' ') || "Recycled Item"}
                                    date={format(new Date(submission.created_at), "EEEE, d MMM yyyy")}
                                />
                            </Link>
                        ))
                    ) : (
                        <div className="p-4 text-center text-foreground/50 text-sm">
                            No recent activity found.
                        </div>
                    )}
                </div>
            </div>

            <Navbar activeIndex={2} />
        </div>
    );
}
