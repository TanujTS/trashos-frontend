import Header from "@/components/header";
import PeriodCards from "@/components/period-card";
import ActivityItem from "@/components/activity-item";
import StatsCard from "@/components/stats-card";
import { IoCameraOutline } from "react-icons/io5";

export default function Dashboard() {
  // temporary dummy data
    const stats = {
        totalKg: "20.56",
        revenue: "2,546",
        name: "Name",
        joinedDate: "6/02/2026",
    };

    const periods = {
        yearly: "40",
        monthly: "18",
        weekly: "6",
    };

    const activities = [
        {
        id: 1,
        item: "Plastic waste recycled",
        date: "Friday, 6 Feb 2026",
        },
        {
        id: 2,
        item: "Paper waste recycled",
        date: "Thursday, 5 Feb 2026",
        },
        {
        id: 3,
        item: "E-waste recycled",
        date: "Wednesday, 4 Feb 2026",
        },
    ];

    return (
        <div className="min-h-screen bg-[#EDFCDE] px-4 pt-6 pb-28">
        
        <Header name="Name" />

        <button className="absolute top-24 right-4 bg-[#C3E75F] text-black px-6 py-2 rounded-full flex items-center gap-2 text-sm font-medium border-1 border-black">
                <IoCameraOutline size={18} />
                Scan now
                </button>

        
        <StatsCard
            totalKg={stats.totalKg}
            revenue={stats.revenue}
            name={stats.name}
            joinedDate={stats.joinedDate}
        />

        
        <PeriodCards
            yearly={periods.yearly}
            monthly={periods.monthly}
            weekly={periods.weekly}
        />


        <div className="mt-8">
            <h3 className="mb-3 font-semibold">Recent Activity</h3>

            <div className="rounded-2xl bg-white p-3">
            {activities.map((activity) => (
                <ActivityItem
                key={activity.id}
                item={activity.item}
                date={activity.date}
                />
            ))}
            </div>
        </div>
        </div>
    );
}
