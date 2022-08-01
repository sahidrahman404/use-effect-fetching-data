import { useEffect, useState } from "react";

// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonDataView,
  PokemonForm,
  fetchPokemon,
  Pokemon,
  PokemonInfoFallback,
} from "./pokemon";

function PokemonInfo({ pokemonName }: { pokemonName: string }) {
  // 🐨 Have state for the pokemon (null)
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  useEffect(() => {
    let isFetced = true;

    // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
    if (!pokemonName) {
      return;
    }

    // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
    setPokemon(null);

    // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
    //   fetchPokemon('Pikachu').then(
    //     pokemonData => {/* update all the state here */},
    //   )
    fetchPokemon(pokemonName).then((pokemonData) => {
      /* update all the state here */
      if (isFetced) {
        setPokemon(pokemonData);
      }
    });
    return () => {
      // cancel the request before component unmounts
      isFetced = false;
    };
    // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  }, [pokemonName]);

  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  if (!pokemonName) {
    return <h1>Submit a pokemon</h1>;
  }

  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  if (pokemonName && !pokemon) {
    return <PokemonInfoFallback name={pokemonName} />;
  }
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  return <PokemonDataView pokemon={pokemon as Pokemon} />;
}

function App() {
  const [pokemonName, setPokemonName] = useState("");

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
