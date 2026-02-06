import { Trash } from "lucide-react";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function ActivityItem({
  item,
  date,
}: {
  item: string;
  date: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-none">
      
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center">
          <Trash size={18} />
        </div>

        {/* Text */}
        <div>
          <p className="text-sm font-medium text-black">{item}</p>
          <p className="text-xs text-black/50">{date}</p>
        </div>
      </div>

      {/* Arrow */}
      <MdOutlineArrowOutward className="text-xl text-black/60" />
    </div>
  );
}
