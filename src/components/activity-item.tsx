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
        <div className="h-10 w-10 rounded-full bg-foreground text-secondary-foreground flex items-center justify-center">
          <Trash size={18} />
        </div>

        {/* Text */}
        <div>
          <p className="text-sm font-medium text-foreground">{item}</p>
          <p className="text-xs text-foreground/50">{date}</p>
        </div>
      </div>

      {/* Arrow */}
      <MdOutlineArrowOutward className="text-xl text-foreground/60" />
    </div>
  );
}
