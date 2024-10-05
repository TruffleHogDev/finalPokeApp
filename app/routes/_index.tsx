import {
  ClientLoaderFunctionArgs,
  Form,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import pokeBall from "../images/pokeBall.png";
import "app/index.css";

// Pokémon name mapping
const pokemonNameMap = {
  "Mr. Mime": "mr-mime",
  "mr. mime": "mr-mime",
  "mr mime": "mr-mime",
  "Mr. Rime": "mr-rime",
  "mr rime": "mr-rime",
  "mr. rime": "mr-rime",
  "Scream Tail": "scream-tail",
  "Flutter Mane": "flutter-mane",
  "Iron Moth": "iron-moth",
  "Iron Jugulis": "iron-jugulis",
  "Iron Bundle": "iron-bundle",
  "Great Tusk": "great-tusk",
  "Brute Bonnet": "brute-bonnet",
  "Slither Wing": "slither-wing",
  "Sandy Shocks": "sandy-shocks",
  "Roaring Moon": "roaring-moon",
  "Walking Wake": "walking-wake",
  "Gouging Fire": "gouging-fire",
  "Raging Bolt": "raging-bolt",
  "Iron Treads": "iron-treads",
  "Iron Hands": "iron-hands",
  "Iron Thorns": "iron-thorns",
  "Iron Valiant": "iron-valiant",
  "Iron Leaves": "iron-leaves",
  "Iron Boulder": "iron-boulder",
  "Iron Crown": "iron-crown",
  "type null": "type-null",
  "Type: Null": "type-null",
  "Type:Null": "type-null",
  "type:null": "type-null",
  "type: null": "type-null",
  "Porygon Z": "porygon-z",
  "porygon z": "porygon-z",
  "Porygon 2": "porygon2",
  "porygon 2": "porygon2",
};

// Data fetching area
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
  const [spriteUrl, setSpriteUrl] = useState<string>(pokeBall);
  const [types, setTypes] = useState<string>("");
  const [stats, setStats] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    if (pokemon.length > 0) {
      setSpriteUrl(pokemon[0].sprite);
      setTypes(pokemon[0].types);
      setStats(pokemon[0].stats);
    } else {
      setSpriteUrl(pokeBall);
      setTypes("");
      setStats([]);
    }
  }, [pokemon]);

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
      const query = (e.target as HTMLInputElement).value;
      const apiFriendlyName = getApiFriendlyName(query);
      navigate(`/?pokemon=${encodeURIComponent(apiFriendlyName)}`);
      e.preventDefault();
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
    <div className="bg-slate-300 p-4">
      <h1 className="text-center text-xl mb-4">
        Enter the name of a Pokémon... or suffer the consequences...
      </h1>
      <Form className="text-lg grid mx-[30%]" method="get">
        <input
          className="rounded border-3 border-solid m-1 indent-1"
          type="text"
          name="pokemon"
          id="searchField"
          onKeyDown={handleKeyDown}
        />
      </Form>
      <figure className="text-center mb-4">
        <img
          className="w-4/6 sm:w-3/4 m-auto max-w-[400px]"
          src={spriteUrl}
          alt="This is where the sprite renders!"
        />
        <figcaption className="text-center text-lg mt-2">
          {types ? `Types: ${types}` : ""}
        </figcaption>
      </figure>
      <div className="mt-4 text-center">
        <div className="stat-bar-container">
          {stats.length > 0 ? (
            stats.map((stat) => (
              <div key={stat.name} className="stat-bar">
                <span className="stat-bar-label">{stat.name}</span>
                <div
                  className={`stat-bar-value ${getBarColor(stat.name)}`}
                  style={{ width: `${stat.value}%` }}
                >
                  {stat.value}
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
