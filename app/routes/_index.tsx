import { useEffect, useState } from "react";
import {
  ClientLoaderFunctionArgs,
  Form,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
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
  "zacian-c": "zacian-crowned",
  "Zacian-C": "zacian-crowned",
  "zacian c": "zacian-crowned",
  "Zacian C": "zacian-crowned",
  "Zacian c": "zacian-crowned",
  "zacian C": "zacian-crowned",
  "Zacian-crowned": "zacian-crowned",
  "Zacian-Crowned": "zacian-crowned",
  "zacian crowned": "zacian-crowned",
  "Zacian Crowned": "zacian-crowned",
  "zamazenta-c": "zamazenta-crowned",
  "Zamazenta-C": "zamazenta-crowned",
  "zamazenta-C": "zamazenta-crowned",
  "Zamazenta-c": "zamazenta-crowned",
  "zamazenta c": "zamazenta-crowned",
  "Zamazenta C": "zamazenta-crowned",
  "zamazenta C": "zamazenta-crowned",
  "Zamazenta c": "zamazenta-crowned",
  "zamazenta crowned": "zamazenta-crowned",
  "Zamazenta Crowned": "zamazenta-crowned",
  "farfetch'd": "farfetchd",
  "sirfetch'd": "sirfetchd",
  "mega rayquaza": "rayquaza-mega",
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
  const [searchValue, setSearchValue] = useState(""); // State for the search field

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

  // Capitalize the first letter of each word and replace hyphens with spaces
  const capitalize = (name) => {
    return name
      .split("-") // Split by hyphens instead of spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter and make the rest lowercase
      .join(" "); // Join the words with spaces
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
      e.preventDefault(); // Prevent the default form submission
      const apiFriendlyName = getApiFriendlyName(searchValue); // Get the API-friendly name
      navigate(`/?pokemon=${encodeURIComponent(apiFriendlyName)}`);
      setSearchValue(""); // Clear the search field
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
    <div className="bg-slate-300 p-4 h-screen flex flex-col items-center justify-center">
      <h1 className="text-center text-xl mb-4">
        Enter the name of a Pokémon... or suffer the consequences...
      </h1>
      <Form className="text-lg grid mx-[30%]" method="get">
        <input
          className="rounded border-3 border-solid m-1 indent-1"
          type="text"
          name="pokemon"
          id="searchField"
          value={searchValue} // Bind the input value to the state
          onChange={(e) => setSearchValue(e.target.value)} // Update state on input change
          onKeyDown={handleKeyDown} // Handle key down event
        />
      </Form>

      {pokemon.length > 0 ? (
        <div className="flex justify-center mt-4">
          <div className="w-[400px] h-[400px] flex flex-col items-center justify-center border-double rounded border-2 border-slate-500 ml-4">
            <img
              className="h-[250px] max-w-full object-contain"
              src={spriteUrl}
              alt="This is where the sprite renders!"
            />
            <h2 className="text-lg mt-2">{capitalize(pokemon[0].name)}</h2>
            <p className="text-md">
              {types ? `Types: ${types}` : "No types available"}
            </p>
          </div>
          <div className="w-[400px] h-[400px] flex flex-col items-center justify-center border-double rounded border-2 border-slate-500 ml-4">
            {stats.length > 0 ? (
              stats.map((stat) => (
                <div key={stat.name} className="stat-bar mb-2">
                  <span className="stat-bar-label block text-left mb-1">
                    {stat.name}
                  </span>
                  <div
                    className="stat-bar-value-container"
                    style={{ width: "300px" }}
                  >
                    <div
                      className={`stat-bar-value ${getBarColor(stat.name)}`}
                      style={{
                        width: `${(stat.value / 255) * 100}%`, // Calculate relative width
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
      ) : (
        <div className="flex flex-col items-center">
          <img
            className="w-[250px] h-[250px] object-contain"
            src={spriteUrl}
            alt="Pokéball"
          />
        </div>
      )}
    </div>
  );
}
