"use client";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface UpNavProps {
  title: string;
}

export default function UpNav({ title }: UpNavProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 py-3">

      {/* Back */}
      <div
        onClick={() => router.back()}
        className="flex items-center justify-center w-10 h-10 bg-card rounded-xl cursor-pointer hover:bg-muted transition-colors"
      >
        <FaArrowLeftLong className="text-foreground" />
      </div>

      {/* Title */}
      <h1 className="text-lg font-semibold text-foreground">
        {title}
      </h1>

      {/* Bell */}
      <div className="flex items-center justify-center w-10 h-10 bg-card rounded-xl">
        <FaRegBell className="text-foreground" />
      </div>

    </div>
  );
}
