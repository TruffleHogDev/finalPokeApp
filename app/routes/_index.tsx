import {
  ClientLoaderFunctionArgs,
  Form,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import Search from "./search";

// Data fetching area

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  let pokemonQuery = "";
  let pokemon = [];

  try {
    // Fetch data from API
    let url = new URL(request.url);
    let searchParams = url.searchParams;
    pokemonQuery = searchParams.get("pokemon") ?? "";

    if (!pokemonQuery) {
      // Return an empty array if no query is provided
      return { pokemon: [] };
    }

    console.log(pokemonQuery);

    let result1 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonQuery.toLowerCase()}`
    );

    if (!result1.ok) {
      // If the response is not OK (e.g., 404), handle the error
      console.error("Pokemon not found");
      return { pokemon: [] };
    }

    let result1Json = await result1.json();

    console.log(result1Json.id);

    let result2 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${result1Json.name}`
    );

    if (!result2.ok) {
      // If the response is not OK (e.g., 404), handle the error
      console.error("Additional Pokémon data not found");
      return { pokemon: [] };
    }

    let result2Json = await result2.json();

    console.log(result2Json.base_experience);

    // API call 1 contains Pokémon base info
    // API call 2 is a secondary call to get more info about the Pokémon
    pokemon = [{ name: `${result2Json.name}` }];
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    // If any error occurs, set pokemon to an empty array
    pokemon = [];
  }

  return {
    pokemon: pokemon.filter((p) =>
      p.name.toLowerCase().startsWith(pokemonQuery.toLowerCase())
    ),
  };
}

export default function PokemonInfoPage() {
  const { pokemon } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();

  return (
    <div className="bg-red-500">
      <Search />
      <h1 className="text-center text-xl">
        Enter the name of a Pokémon... or suffer the consequences...
      </h1>
      <Form className="text-pink-600 text-lg grid mx-[30%]" method="get">
        <input
          style={{
            border: "rounded 3px solid green",
            borderRadius: "0.25rem",
            margin: "5px",
          }}
          type="text"
          name="pokemon"
          id="searchField"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/?pokemon=${(e.target as HTMLInputElement).value}`);
              e.preventDefault();
            }
          }}
        />
      </Form>
    </div>
  );
}
