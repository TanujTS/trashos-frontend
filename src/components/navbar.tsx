"use client";

import { useState } from "react";
import { ChartLine, ScanQrCode, UserRound } from "lucide-react";

export default function Navbar() {
    const [active, setActive] = useState<number>(0);

    const iconClasses = (index: number) =>
        `
        flex items-center justify-center
        w-12 h-12 rounded-full
        cursor-pointer
        transition-all duration-300 ease-out
        ${active === index
            ? "bg-[#C3E75F] text-black"
            : "bg-[#3D3D3D] text-white"}
        `;

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-4 p-2 bg-black rounded-full shadow-lg">

                <div onClick={() => setActive(0)} className={iconClasses(0)}>
                <ChartLine size={22} />
                </div>

                <div onClick={() => setActive(1)} className={iconClasses(1)}>
                <ScanQrCode size={22} />
                </div>

                <div onClick={() => setActive(2)} className={iconClasses(2)}>
                <UserRound size={22} />
                </div>

            </div>
        </nav>
    );
}
