import { genOnePokemon } from "../data/GenOnePokemon";
import { genTwoPokemon } from "../data/GenTwoPokemon";
import { genThreePokemon } from "../data/GenThreePokemon";
import { genFourPokemon } from "~/data/GenFourPokemon";
import { genFivePokemon } from "~/data/GenFivePokemon";
// import { regionalForms } from "../data/RegionalForms";
// import { megaEvolutions } from "../data/MegaEvolutions";

type SearchCategory = "gen1" | "gen2" | "gen3" | "gen4" | "gen5" | "all"; // Extend this list as needed

const categoryMap: Record<SearchCategory, string[]> = {
  gen1: genOnePokemon,
  gen2: genTwoPokemon,
  gen3: genThreePokemon,
  gen4: genFourPokemon,
  gen5: genFivePokemon,
  all: [
    ...genOnePokemon,
    ...genTwoPokemon,
    ...genThreePokemon,
    ...genFourPokemon,
    ...genFivePokemon,
  ], // Add more sources here as needed
};

/**
 * Returns up to 5 matching Pokémon names from the selected category.
 *
 * @param input The user's search input
 * @param category The pool to search from ("gen1", "gen2", or "all"). Defaults to "all".
 */
export function getPredictiveMatches(
  input: string,
  category: SearchCategory = "all"
): string[] {
  if (!input.trim()) return [];

  const query = input.toLowerCase().trim();
  const pool = categoryMap[category] ?? [];

  return pool
    .filter((name) => name.toLowerCase().startsWith(query))
    .slice(0, 5);
}
