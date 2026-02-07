import UpNav from "@/components/up-nav";
import Navbar from "@/components/navbar";
import StatsCard from "@/components/stats-card";
import { IoCameraOutline } from "react-icons/io5";
import { Banknote } from 'lucide-react';
import { GoArrowUpRight } from "react-icons/go";

interface CustomStatsProps {
    co2Averted?: number;
    resellValue?: number;
}

export default function CustomStats({
    co2Averted = 0.5,
    resellValue = 20.4
}: CustomStatsProps = {}) {
    // Corner bracket styling variables
    const strokeWidth = 3;
    const framePadding = 16;
    const cornerStyle = {
        position: 'absolute' as const,
        width: 40,
        height: 40,
        borderColor: 'var(--foreground)',
        borderStyle: 'solid',
    };

    return (
        <div className="min-h-screen bg-background relative font-sans flex flex-col">
            <UpNav title="custom stats" />

            {/* Camera Scan Area - 60% */}
            <div className="h-[60vh] flex items-center justify-center relative px-6 py-8 bg-background">
                {/* Cardboard Image */}
                <img
                    src="/cardboard.png"
                    alt="Cardboard Box"
                    className="w-72 h-auto object-contain z-10"
                />

                {/* Corner Brackets */}
                <div style={{ ...cornerStyle, top: framePadding, left: framePadding, borderWidth: `${strokeWidth}px 0 0 ${strokeWidth}px` }} />
                <div style={{ ...cornerStyle, top: framePadding, right: framePadding, borderWidth: `${strokeWidth}px ${strokeWidth}px 0 0` }} />
                <div style={{ ...cornerStyle, bottom: framePadding, left: framePadding, borderWidth: `0 0 ${strokeWidth}px ${strokeWidth}px` }} />
                <div style={{ ...cornerStyle, bottom: framePadding, right: framePadding, borderWidth: `0 ${strokeWidth}px ${strokeWidth}px 0` }} />

            </div>

            {/* Stats Card Area - 40% */}
            <div className="flex-1 bg-background pb-24">
                {/* Header with Label and Button */}
                <div className="flex items-end justify-between px-4 mb-0">
                    {/* Cardboard Box Label */}
                    <div className="bg-foreground py-3 px-6 rounded-tr-3xl rounded-tl-xl">
                        <span className="text-primary font-bold text-lg">Cardboard Box</span>
                    </div>

                    {/* View Stats Button */}
                    <div className="pb-3">
                        <button className="bg-primary py-2 px-6 rounded-full flex items-center gap-2 shadow-lg -ml-8">
                            <span className="text-secondary-foreground font-semibold text-sm">view stats</span>
                            <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                                <GoArrowUpRight className="text-secondary-foreground text-sm" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Folder Image with Stats Overlay */}
                <div
                    className="mx-4 -mt-1 bg-foreground rounded-tr-[50px] rounded-tl-none p-6 pt-8  relative"
                    style={{
                        backgroundImage: "url('/folder.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
                    {/* Stats Text */}
                    <div className="space-y-3 text-base text-secondary-foreground mb-8">
                        <p className="leading-relaxed">
                            CO2 averted: <span className="text-primary font-semibold">~{co2Averted} tonnes</span>
                        </p>
                        <p className="leading-relaxed">
                            Approximate Resell Value : <span className="text-primary font-semibold">~ INR {resellValue}</span>
                        </p>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-primary py-1 rounded-full flex items-center justify-between px-6 shadow-lg hover:opacity-90 transition-opacity">
                        <span className="text-secondary-foreground font-bold text-base">
                            see resell options near you
                        </span>
                        <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center">
                            <Banknote className="text-secondary-foreground w-5 h-5" />
                        </div>
                    </button>
                </div>

            </div>

        </div>
    );
}