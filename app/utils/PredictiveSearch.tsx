import { genOnePokemon } from "../data/GenOnePokemon";

export function getPredictiveMatches(input: string): string[] {
  if (!input.trim()) return [];
  const query = input.toLowerCase().trim();

  // Use fuzzy matching to find more relevant matches (using `startsWith` here for simplicity)
  return genOnePokemon
    .filter((name) => name.toLowerCase().startsWith(query)) // case-insensitive matching
    .slice(0, 5); // limit to 5 suggestions
}
