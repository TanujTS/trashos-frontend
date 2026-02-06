import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";

interface UpNavProps {
  title: string;
}

export default function UpNav({ title }: UpNavProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3">

      {/* Back */}
      <div className="flex items-center justify-center w-10 h-10 bg-card rounded-xl">
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
