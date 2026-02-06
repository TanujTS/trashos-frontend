interface PeriodCardsProps {
  yearly: string;
  monthly: string;
  weekly: string;
}

export default function PeriodCards({
  yearly,
  monthly,
  weekly,
}: PeriodCardsProps) {
  return (
    <div className="relative mt-8 flex items-end">

      {/* Yearly (back, left) */}
      <div
        className="
          relative z-10
          w-40
          h-40
          rounded-2xl
          bg-card 
          p-4
          shadow-md
          rotate-z-6
        "
      >
        <p className="font-semibold text-foreground">Yearly</p>
        <p className="text-sm text-foreground/60">CO2 emissions</p>
        <p className="text-primary font-semibold">
          {yearly} tonnes
        </p>
      </div>

      {/* Monthly (middle, slightly forward) */}
      <div
        className="
          relative z-20
          -ml-10
          -mb-2
          w-40
          h-40
          rounded-2xl
          bg-primary
          p-4
          shadow-lg
          -rotate-z-6
        "
      >
        <p className="font-semibold text-secondary-foreground">Monthly</p>
        <p className="text-sm text-secondary-foreground/80">CO2 emissions</p>
        <p className="text-secondary-foreground font-semibold">
          {monthly} tonnes
        </p>
      </div>

      {/* Weekly (front, right) */}
      <div
        className="
          relative z-30
          -ml-10
          w-40
          h-40
          rounded-2xl
          bg-foreground
          p-4
          shadow-xl
          rotate-z-2
        "
      >
        <p className="font-semibold text-primary">Weekly</p>
        <p className="text-sm text-secondary-foreground/60">CO2 emissions</p>
        <p className="text-secondary-foreground font-semibold">
          {weekly} tonnes
        </p>
      </div>

    </div>
  );
}
