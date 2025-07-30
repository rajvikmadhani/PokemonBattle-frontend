import { useEffect, useState } from 'react';
import { usePokemon } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import { getAllPokemon } from '../utils/pokemonAPI'; // Assumed to return detailed Pokémon data

const Roster = () => {
  const { removePokemonFromRoster } = usePokemon();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [roster, setRoster] = useState([]);

  useEffect(() => {
    const fetchTemporaryRoster = async () => {
      try {
        // Assume getAllPokemon returns an array of detailed Pokémon objects
        const detailedPokemon = await getAllPokemon();
        setRoster(detailedPokemon.slice(0, 6)); // Limit to 6 Pokémon
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchTemporaryRoster();
  }, []);

  useEffect(() => {
    if (roster.length > 0 && !selectedPokemon) {
      setSelectedPokemon(roster[0]);
    }
  }, [roster, selectedPokemon]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">My Pokémon Roster</h2>

      {roster.length === 0 ? (
        <p className="text-center text-gray-600">
          No Pokémon in your roster yet. Add some from the homepage!
        </p>
      ) : (
        <>
          {selectedPokemon && (
            <div className="mb-8 flex justify-center">
              <PokemonCard
                pokemon={selectedPokemon}
                isInRoster={true}
                onRemove={() => removePokemonFromRoster(selectedPokemon.id)}
              />
            </div>
          )}

          <div className="grid lg:grid-cols-6 grid-cols-3 gap-4">
            {roster.map(pokemon => (
              <div
                key={pokemon.id}
                onClick={() => setSelectedPokemon(pokemon)}
                className={`cursor-pointer border-2 rounded-lg p-2 transition-all transform duration-300 hover:scale-105 ${
                  selectedPokemon?.id === pokemon.id
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-300 hover:border-gray-500'
                }`}
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-full h-24 object-contain"
                />
                <p className="text-center font-semibold capitalize mt-2">{pokemon.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Roster;
