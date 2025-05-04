import pokeBall from "../images/pokeBall.png";

type PokemonCardProps = {
  name: string;
  sprite: string;
  types: string[];
};

const capitalize = (name: string) => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export function PokemonCard({ name, sprite, types }: PokemonCardProps) {
  return (
    <div className="flex-1 bg-white rounded-2xl shadow-md p-6 flex flex-col items-center border border-gray-200">
      <img
        className="h-[200px] max-w-full object-contain mb-4"
        src={sprite || pokeBall}
        alt="Pokémon sprite"
      />
      <h2 className="text-lg font-semibold mb-2 text-gray-800">
        {capitalize(name || "Unknown Pokémon")}
      </h2>
      <div className="flex gap-2 flex-wrap justify-center">
        {types.map((type) => (
          <span
            key={type}
            className={`pokemon-type type-${type.toLowerCase()}`}
          >
            {capitalize(type)}
          </span>
        ))}
      </div>
    </div>
  );
}
