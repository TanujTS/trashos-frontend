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
          bg-white 
          p-4
          shadow-md
          rotate-z-6
        "
      >
        <p className="font-semibold text-black">Yearly</p>
        <p className="text-sm text-black/60">CO2 emissions</p>
        <p className="text-[#C3E75F] font-semibold">
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
          bg-[#C3E75F]
          p-4
          shadow-lg
          -rotate-z-6
        "
      >
        <p className="font-semibold text-white">Monthly</p>
        <p className="text-sm text-white/80">CO2 emissions</p>
        <p className="text-white font-semibold">
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
          bg-black
          p-4
          shadow-xl
          rotate-z-2
        "
      >
        <p className="font-semibold text-[#C3E75F]">Weekly</p>
        <p className="text-sm text-white/60">CO2 emissions</p>
        <p className="text-white font-semibold">
          {weekly} tonnes
        </p>
      </div>

    </div>
  );
}
