import { FaRegBell } from "react-icons/fa";

interface HeaderProps {
  name: string;
}

export default function Header({ name }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-foreground" />
        <div>
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs text-foreground/60">welcome back</p>
        </div>
      </div>

      <div className="h-14 w-14 rounded-2xl bg-card flex items-center justify-center">
        <FaRegBell className="text-foreground text-lg" />
      </div>
    </div>
  );
}
