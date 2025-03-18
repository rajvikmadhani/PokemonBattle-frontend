import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonById } from "../utils/pokemonAPI";
import PokemonCard from "../components/PokemonCard"; // Import hinzufügen

const Details = () => {
  const { id = 25 } = useParams(); // Default to Pikachu if no ID is provided
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonById(id);
        setPokemon(data);
        console.log("Successfully fetched Pokémon details.", data);
      } catch (err) {
        setError("Failed to fetch Pokémon details.");
      }
    };

    fetchPokemon();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <PokemonCard pokemon={pokemon} /> {/* Reusable Card Component */}
    </div>
  );
};

export default Details;
