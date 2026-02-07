"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChartLine, ScanQrCode, UserRound } from "lucide-react";



export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const routes = ["/statistics", "/camera", "/dashboard"];

  const getActiveIndex = () => {
    if (pathname.startsWith("/statistics")) return 0;
    if (pathname.startsWith("/camera")) return 1;
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/submissions")) return 2;
    return -1;
  };

  const activeIndex = getActiveIndex();

  const handleNavigation = (index: number) => {
    router.push(routes[index]);
  };

  const iconClasses = (index: number) =>
    `
        flex items-center justify-center
        h-14 w-14 rounded-full
        cursor-pointer
        transition-all duration-300 ease-out
        ${activeIndex === index
      ? "bg-[#ABC339] text-black scale-110 shadow-lg"
      : "bg-transparent text-[#9CA3AF] hover:text-white hover:bg-white/10"}
        `;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 px-3 bg-[#1A1A1A] border border-[#333] rounded-full shadow-2xl backdrop-blur-md bg-opacity-95">

        <div onClick={() => handleNavigation(0)} className={iconClasses(0)}>
          <ChartLine size={24} strokeWidth={2} />
        </div>

        <div onClick={() => handleNavigation(1)} className={iconClasses(1)}>
          <ScanQrCode size={24} strokeWidth={2} />
        </div>

        <div onClick={() => handleNavigation(2)} className={iconClasses(2)}>
          <UserRound size={24} strokeWidth={2} />
        </div>

      </div>
    </nav>
  );
}
