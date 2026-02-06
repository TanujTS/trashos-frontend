interface StatsCardProps {
  totalKg: string;
  revenue: string;
  name: string;
  joinedDate: string;
}

export default function StatsCard({
  totalKg,
  revenue,
  name,
  joinedDate,
}: StatsCardProps) {
  return (
    <div className="mt-4">
      <div
        className="
          relative
          w-full
          min-h-[220px]
          rounded-3xl
          overflow-hidden
          bg-cover
          bg-center
          text-white
        "
        style={{
          backgroundImage: "url('/folder.png')",
        }}
      >

        {/* Vertical Rectangle Decoration */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-1/2 bg-primary rounded-md" />

        {/* Content */}
        <div className="relative p-5">
          <div className="flex justify-between items-start mb-4">
            <h1 className="font-bold">TrashOS</h1>

          </div>

          {/* Stats */}
          <div className="space-y-6 mb-6">
            <div>
              <p className="text-[#656C6C] text-sm mb-1">
                Total Kilos Of Recycled Waste:
              </p>
              <p className="text-lg font-bold">
                KG {totalKg}
              </p>
            </div>

            <div>
              <p className="text-[#656C6C] text-sm mb-1">
                Total Revenue Generated:
              </p>
              <p className="text-lg font-bold">
                INR {revenue}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-[#656C6C] text-sm">
            <span>{name}</span>
            <span>joined on {joinedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
