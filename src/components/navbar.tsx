"use client";

import { useRouter } from "next/navigation";
import { ChartLine, ScanQrCode, UserRound } from "lucide-react";

interface NavbarProps {
  activeIndex?: number;
}

export default function Navbar({ activeIndex = 0 }: NavbarProps) {
  const router = useRouter();

  const routes = ["/statistics", "/camera", "/dashboard"];

  const handleNavigation = (index: number) => {
    router.push(routes[index]);
  };

  const iconClasses = (index: number) =>
    `
        flex items-center justify-center
        w-12 h-12 rounded-full
        cursor-pointer
        transition-all duration-300 ease-out
        ${activeIndex === index
      ? "bg-primary text-primary-foreground"
      : "bg-secondary text-secondary-foreground"}
        `;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 p-2 bg-foreground rounded-full shadow-lg">

        <div onClick={() => handleNavigation(0)} className={iconClasses(0)}>
          <ChartLine size={22} />
        </div>

        <div onClick={() => handleNavigation(1)} className={iconClasses(1)}>
          <ScanQrCode size={22} />
        </div>

        <div onClick={() => handleNavigation(2)} className={iconClasses(2)}>
          <UserRound size={22} />
        </div>

      </div>
    </nav>
  );
}
