"use client";

import { useState } from 'react';
import { FaExclamationTriangle, FaRegLightbulb } from "react-icons/fa";
import UpNav from "@/components/up-nav";
import Navbar from "@/components/navbar";
import { useImpactStats, useCO2History } from '@/hooks/use-stats';
import { NumberDotLineChart } from '@/components/ui/number-dot-chart';
import Loader from "@/components/loader";

export default function Statistics() {
    const [selectedPeriod, setSelectedPeriod] = useState('Weekly');
    const periods = ['Weekly', 'Monthly', 'Yearly'];
    const { data: impDeets } = useImpactStats();
    const { data: historyData, isLoading: isHistoryLoading } = useCO2History(selectedPeriod as 'Weekly' | 'Monthly' | 'Yearly');

    // Fallback if data is not loaded yet
    const displayDeets = impDeets || {
        recycledItems: 0,
        co2Averted: 0,
        earned: 0,
        treesSaved: 0,
    };

    if (isHistoryLoading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-background px-4 pt-6 pb-28 font-sans">
            <UpNav title="Statistics" />

            {/* Period Selector */}
            <div className="flex justify-between items-center mt-6 px-2">
                {periods.map((period) => (
                    <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`
                            h-24 w-24 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                            ${selectedPeriod === period
                                ? 'bg-primary text-foreground scale-105 shadow-lg'
                                : 'bg-card text-foreground hover:bg-card'}
                        `}
                    >
                        {period}
                    </button>
                ))}
            </div>

            {/* Vertical Rectangles */}
            <div className="flex gap-4 mt-8 h-auto">
                {/* Left Card - IMP DEETS (Green) */}
                <div className="flex-1 bg-primary rounded-[30px] p-5 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-primary-foreground">IMP DEETS</h3>
                        <div className="h-8 w-8 rounded-full bg-foreground flex items-center justify-center text-secondary-foreground text-sm">
                            <FaExclamationTriangle />
                        </div>
                    </div>

                    <div className="space-y-3 text-sm font-medium text-primary-foreground">
                        <div>
                            <p className='text-secondary-foreground'>No of items recycled:</p>
                            <p>= {displayDeets.recycledItems}</p>
                        </div>
                        <div>
                            <p className='text-secondary-foreground'>CO2 averted:</p>
                            <p>~ {displayDeets.co2Averted} tonnes</p>
                        </div>
                        <div>
                            <p className='text-secondary-foreground'>Earned so far</p>
                            <p>~ INR {displayDeets.earned}</p>
                        </div>
                        <div>
                            <p className='text-secondary-foreground'>Trees Saved</p>
                            <p>~ {displayDeets.treesSaved}</p>
                        </div>
                    </div>
                </div>

                {/* Right Card - FUN FACT (Black) */}
                <div className="flex-1 bg-foreground rounded-[30px] p-5 flex flex-col gap-4 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-primary">FUN FACT</h3>
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">
                            <FaRegLightbulb />
                        </div>
                    </div>

                    <div className="text-sm leading-relaxed text-secondary-foreground">
                        <p>
                            Recycling a <span className="text-primary">single ton</span> of <span className="text-primary">paper</span> -
                            enabled by proper segregation - saves approximately
                            <span className="text-primary"> 7,000 gallons</span> of <span className="text-primary">water</span> and enough energy
                            to save significant amounts of fossil fuels.
                        </p>
                    </div>
                </div>
            </div>

            {/* Overview */}
            <h2 className="mt-8 text-xl font-bold text-foreground">Overview</h2>

            {/* Graph */}
            <div className="mt-4 w-full">
                <NumberDotLineChart
                    data={historyData || []}
                    title={`CO2 Averted (${selectedPeriod})`}
                    description={`CO2 savings over the last ${selectedPeriod === 'Weekly' ? '7 days' : selectedPeriod === 'Monthly' ? '4 weeks' : '6 months'}`}
                    color="#ABC339"
                />
            </div>

            <Navbar />
        </div>
    );
}
