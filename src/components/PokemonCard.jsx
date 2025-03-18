import { usePokemon } from "../context/pokemonContext";

const PokemonCard = ({ pokemon, isInRoster = false, onRemove }) => {
  const { addPokemonToRoster, removePokemonFromRoster, limitReached } =
    usePokemon();

  const handleAddPokemon = () => {
    addPokemonToRoster(pokemon);
  };

  const handleRemovePokemon = () => {
    removePokemonFromRoster(pokemon.id);
  };

  return (
    <div>
      <div className="max-w-sm bg-red-600 border border-gray-300 rounded-xl shadow-xl p-4">
        <div className="flex gap-1 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 border border-black"></div>
          <div className="w-4 h-4 rounded-full bg-red-500 border border-black"></div>
          <div className="w-4 h-4 rounded-full bg-yellow-500 border border-black"></div>
          <div className="w-4 h-4 rounded-full bg-green-500 border border-black"></div>
        </div>

        <div className="p-2 rounded-xl bg-gray-500 flex flex-col border border-black">
          <div className="flex gap-3 px-2 pb-2 justify-center">
            <div className="w-5 h-5 rounded-full bg-red-500 border border-black"></div>
            <div className="w-5 h-5 rounded-full bg-red-500 border border-black"></div>
            {/* Pokémon Image */}
          </div>
          <img
            className="w-full h-48 object-contain border border-gray-900 rounded-lg bg-gray-100"
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
          />
          <div className="flex items-center justify-between px-4 pt-2">
            <div>
              <div className="w-8 h-8 rounded-full bg-red-500 border border-black"></div>
            </div>
            <div className="flex flex-col gap-1 px-2 pr-4 items-end">
              <div className="w-16 h-1 rounded-full bg-black border border-black"></div>
              <div className="w-16 h-1 rounded-full bg-black border border-black"></div>
              <div className="w-16 h-1 rounded-full bg-black border border-black"></div>
              <div className="w-16 h-1 rounded-full bg-black border border-black"></div>
              <div className="w-16 h-1 rounded-full bg-black border border-black"></div>
            </div>
          </div>
        </div>

        {/* Pokémon Name and Types */}
        <div className="flex justify-between items-center bg-green-500 rounded-lg border border-gray-900 mt-3 px-5">
          {/* Pokémon Name */}
          <p className="text-md font-semibold capitalize text-gray-800">
            {pokemon.name}
          </p>

          {/* Types */}
          <div className="flex gap-2">
            {pokemon.types.map((typeInfo) => (
              <p
                key={typeInfo.type.name}
                className="text-gray-800 text-md font-semibold capitalize"
              >
                {typeInfo.type.name}
              </p>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 mt-3 rounded-full bg-gray-800 border border-black"></div>
          <div className="flex justify-center bg-green-500 rounded-lg border border-gray-900 mt-2 py-1 ml-2 px-4">
            <ul>
              {pokemon.stats.map((stat) => (
                <li
                  key={stat.stat.name}
                  className="flex justify-between text-sm text-gray-800"
                >
                  <span>{stat.stat.name}</span>
                  <div className="w-5"></div>
                  <span>{stat.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-8xl text-gray-800 font-black">+</div>
        </div>
      </div>

      {/* Add or Remove Button */}
      <div className="flex justify-center mt-4">
        {isInRoster ? (
          <button
            onClick={onRemove || handleRemovePokemon}
            className="w-32 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all"
          >
            Remove from Roster
          </button>
        ) : (
          <button
            onClick={handleAddPokemon}
            disabled={limitReached}
            className={`w-32 py-2 rounded-lg transition-all ${
              limitReached
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {limitReached ? "Roster Full" : "Add to Roster"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
