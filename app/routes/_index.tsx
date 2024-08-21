import { ClientLoaderFunctionArgs, Form, useLoaderData, useNavigate } from '@remix-run/react';

//data fetching area

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  //fetch data from api
  let url = new URL(request.url);
  let searchParams = url.searchParams;
  let pokemonQuery = searchParams.get("pokemon") ?? "";

  let result1 = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`,
  );

  let result1Json = await result1.json()

  let result2 = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0&id=${result1Json.id}`,
  );

  let result2Json = await result2.json();

  //api call 1 contains pokemon base info
  //api call 2 is a secondary call to get more info about the pokemon
  let pokemon = [{ name: `${result2Json.name}` }];

  return {
    pokemon: pokemon.filter((p) =>
      p.name.toLowerCase().startsWith(pokemonQuery.toLowerCase()),
    ),
  }
}

export default function PokemonInfoPage() {
    const { pokemon } = useLoaderData<typeof clientLoader>;
    const navigate = useNavigate();

    return (
        <div>
            <h1>Pokemon Info Page</h1>
            <Form>
                <input
                 style={{ border: "1px solid red", margin: "5px" }}
                 type="text"
                 name="pokemon"
                 onChange={(e) => {
                   navigate(`/pokemon/1?pokemon=${e.target.value}`);
                   e.preventDefault();
                 }}
                 />
            </Form>
        </div>
    )
}