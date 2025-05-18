import { useEffect, useState } from "react";
import {
  ClientLoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import pokeBall from "../images/pokeBall.png";
import "app/index.css";
import { pokemonNameMap } from "../data/PokemonNameMap";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonStatsCard } from "../components/PokemonStatsCard";
import { SearchForm } from "../components/SearchForm";
import { genOnePokemon } from "../data/GenOnePokemon";
import { getPredictiveMatches } from "../utils/PredictiveSearch";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  let pokemonQuery = "";
  let pokemon = [];

  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    pokemonQuery = searchParams.get("pokemon")?.trim() ?? "";

    if (!pokemonQuery) {
      return { pokemon: [] };
    }

    const normalizeName = (name: string) =>
      name.trim().toLowerCase().replace(/\s+/g, "-").replace(/['’]/g, ""); // Remove apostrophes

    const normalizedInput = normalizeName(pokemonQuery);
    const apiFriendlyName =
      pokemonNameMap[pokemonQuery] ||
      pokemonNameMap[normalizedInput] ||
      normalizedInput;

    const result1 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${apiFriendlyName}`
    );

    if (!result1.ok) {
      console.error("Pokemon not found:", result1.statusText);
      return { pokemon: [] };
    }

    const result1Json = await result1.json();

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
        rawTypes: result1Json.types.map((type: any) => type.type.name),
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
  const [typeArray, setTypeArray] = useState<string[]>([]);
  const [stats, setStats] = useState<{ name: string; value: number }[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (pokemon.length > 0) {
      setSpriteUrl(pokemon[0].sprite || pokeBall);
      setTypeArray(pokemon[0].rawTypes || []);
      setStats(pokemon[0].stats || []);
    } else {
      setSpriteUrl(pokeBall);
      setTypeArray([]);
      setStats([]);
    }
  }, [pokemon]);

  const normalizeName = (name: string) =>
    name.trim().toLowerCase().replace(/\s+/g, "-").replace(/['’]/g, ""); // Remove apostrophes

  const getApiFriendlyName = (input: string) => {
    const normalized = normalizeName(input);
    return pokemonNameMap[input] || pokemonNameMap[normalized] || normalized;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        const selectedName = suggestions[selectedIndex];
        handleSuggestionSelect(selectedName);
      } else {
        const typedName = searchValue;
        const apiName = getApiFriendlyName(typedName);
        navigate(`/?pokemon=${encodeURIComponent(apiName)}`);
        setSearchValue("");
        setSuggestions([]);
        setSelectedIndex(-1);
      }
    }
  };

  const handleInputChange = (value: string) => {
    setSearchValue(value);
    const matches = getPredictiveMatches(value);
    setSuggestions(matches);
    setSelectedIndex(-1);
  };

  const handleSuggestionSelect = (selectedName: string) => {
    const apiName = getApiFriendlyName(selectedName);
    navigate(`/?pokemon=${encodeURIComponent(apiName)}`);
    setSearchValue("");
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  return (
    <div className="bg-blue-50 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
        Search for a Pokémon
      </h1>
      <h3 className="text-sm text-gray-600 mb-6 text-center">
        Supports regional forms, megas, and more!
      </h3>

      <SearchForm
        searchValue={searchValue}
        setSearchValue={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSelect={handleSuggestionSelect}
        suggestions={suggestions}
        selectedIndex={selectedIndex}
      />

      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 w-full max-w-5xl">
        <div className="w-full md:w-1/2 flex justify-center">
          <PokemonCard
            name={pokemon[0]?.name || "Unknown Pokémon"}
            sprite={spriteUrl}
            types={typeArray}
          />
        </div>
        <div className="w-[80%] mx-auto md:w-1/2 md:mx-0">
          <PokemonStatsCard stats={stats} />
        </div>
      </div>
    </div>
  );
}
