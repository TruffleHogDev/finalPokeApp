type Stat = {
  name: string;
  value: number;
};

type PokemonStatsCardProps = {
  stats: Stat[];
};

const capitalize = (name: string) => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getBarColor = (statName: string) => {
  switch (statName) {
    case "hp":
      return "bg-green-500";
    case "attack":
      return "bg-red-500";
    case "defense":
      return "bg-blue-500";
    case "speed":
      return "bg-yellow-500";
    case "special-attack":
      return "bg-purple-500";
    case "special-defense":
      return "bg-teal-500";
    default:
      return "bg-gray-500";
  }
};

export function PokemonStatsCard({ stats }: PokemonStatsCardProps) {
  return (
    <div className="flex-1 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Base Stats</h3>
      {stats.length > 0 ? (
        stats.map((stat) => (
          <div key={stat.name} className="mb-4">
            <div className="flex justify-between mb-1 text-sm text-gray-600">
              <span>{capitalize(stat.name)}</span>
              <span>{stat.value}</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getBarColor(
                  stat.name
                )} rounded-full transition-all duration-700 ease-out`}
                style={{ width: `${(stat.value / 255) * 100}%` }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No stats available</p>
      )}
    </div>
  );
}
