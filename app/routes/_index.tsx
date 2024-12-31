import { useEffect, useState } from "react";
import {
  ClientLoaderFunctionArgs,
  Form,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import pokeBall from "../images/pokeBall.png";
import "app/index.css";

// Pokémon name mapping (no changes here)
const pokemonNameMap = {
  // ... (same as before)
};

// Data fetching area (no changes here)
export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  let pokemonQuery = "";
  let pokemon = [];

  try {
    let url = new URL(request.url);
    let searchParams = url.searchParams;
    pokemonQuery = searchParams.get("pokemon")?.trim() ?? "";

    if (!pokemonQuery) {
      return { pokemon: [] };
    }

    const normalizeName = (name) => {
      return name.trim().toLowerCase().replace(/\s+/g, "-");
    };

    const normalizedInput = normalizeName(pokemonQuery);
    const apiFriendlyName =
      pokemonNameMap[pokemonQuery] ||
      pokemonNameMap[normalizedInput] ||
      normalizedInput;

    console.log("Mapped API name:", apiFriendlyName);

    let result1 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${apiFriendlyName}`
    );

    if (!result1.ok) {
      console.error("Pokemon not found:", result1.statusText);
      return { pokemon: [] };
    }

    let result1Json = await result1.json();
    console.log("Fetched Pokémon data:", result1Json);

    const types = result1Json.types
      .map((type: any) => type.type.name)
      .join(", ");
    const stats = result1Json.stats.map((stat: any) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    }));

    pokemon = [
      {
        name: result1Json.name,
        sprite: result1Json.sprites.front_default,
        types: types,
        stats: stats,
      },
    ];
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    pokemon = [];
  }

  return {
    pokemon: pokemon.filter((p) =>
      p.name.toLowerCase().includes(pokemonQuery.toLowerCase())
    ),
  };
}

export default function PokemonInfoPage() {
  const { pokemon } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const [spriteUrl, setSpriteUrl] = useState<string>(pokeBall); // Initialize with pokeBall
  const [types, setTypes] = useState<string>("");
  const [stats, setStats] = useState<{ name: string; value: number }[]>([]);
  const [searchValue, setSearchValue] = useState(""); // State for the search field

  useEffect(() => {
    if (pokemon.length > 0) {
      // Always update spriteUrl when Pokémon data is available
      setSpriteUrl(pokemon[0].sprite || pokeBall); // Will use pokeBall as fallback if no sprite
      setTypes(pokemon[0].types);
      setStats(pokemon[0].stats);
    }
  }, [pokemon]);

  // Capitalize the first letter of each word and replace hyphens with spaces
  const capitalize = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const normalizeName = (name) => {
    return name.trim().toLowerCase().replace(/\s+/g, "-");
  };

  const getApiFriendlyName = (input) => {
    const normalizedInput = normalizeName(input);
    return (
      pokemonNameMap[input] ||
      pokemonNameMap[normalizedInput] ||
      normalizedInput
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const apiFriendlyName = getApiFriendlyName(searchValue);
      navigate(`/?pokemon=${encodeURIComponent(apiFriendlyName)}`);
      setSearchValue("");
    }
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

  return (
    <div className="bg-secondary p-4 h-screen flex flex-col items-center justify-center">
      <h1 className="text-center text-xl mb-4">Enter the name of a Pokémon!</h1>
      <Form className="text-lg grid mx-[30%]" method="get">
        <input
          className="rounded border-2 border-double border-black m-1 indent-1"
          type="text"
          name="pokemon"
          id="searchField"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Form>

      <div className="flex justify-center mt-4">
        <div className="w-[400px] h-[400px] flex flex-col items-center justify-center border-double rounded border-2 bg-cardstock border-black ml-4">
          <img
            className="h-[250px] max-w-full object-contain"
            src={spriteUrl} // Always use spriteUrl (which is set to pokeBall by default)
            alt="This is where the sprite renders!"
          />
          <h2 className="text-lg mt-2">
            {capitalize(pokemon[0]?.name || "Unknown Pokémon")}
          </h2>
          <p className="text-md">
            {types ? `Types: ${types}` : "No types available"}
          </p>
        </div>
        <div className="w-[400px] h-[400px] flex flex-col items-center justify-center border-double rounded border-2 bg-cardstock border-black ml-4">
          {stats.length > 0 ? (
            stats.map((stat) => (
              <div key={stat.name} className="stat-bar mb-2">
                <span className="stat-bar-label block text-left mb-1">
                  {stat.name}
                </span>
                <div className="stat-bar-value-container">
                  <div
                    className={`stat-bar-value ${getBarColor(stat.name)}`}
                    style={{
                      width: `${(stat.value / 255) * 100}%`,
                    }}
                  >
                    {stat.value}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No stats available</p>
          )}
        </div>
      </div>
    </div>
  );
}
