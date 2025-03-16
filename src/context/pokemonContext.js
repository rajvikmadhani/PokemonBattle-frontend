//	• roster → List of selected Pokémon.
//	• addPokemonToRoster → Function to add Pokémon to the rooster.
//	• removePokemonFromRoster → Function to delete Pokémon from rooster.
//	• resetRoster: Clean Reset → (e.g. after a battle).

import { createContext, useState, useContext } from "react";

const PokemonContext = createContext();

export const usePokemon = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [roster, setRoster] = useState([]);
  const [limitReached, setLimitReached] = useState(false);

  // Add Pokémon to rooster with limit check (max 6)
  const addPokemonToRoster = (pokemon) => {
    if (roster.length >= 6) {
      console.warn("Maximum of 6 Pokémon allowed in the roster.");
      setLimitReached(true);
      return false;
    }

    setRoster((prevRoster) => [...prevRoster, pokemon]);
    setLimitReached(false);
    console.log("Pokémon added to roster:", pokemon.name);
    return true;
  };

  // Remove Pokémon by ID
  const removePokemonFromRoster = (id) => {
    setRoster((prevRoster) => prevRoster.filter((poke) => poke.id !== id));
    setLimitReached(false); // Reset limit message after removal
    console.log("Pokémon removed from roster:", id);
  };

  // Reset Roster
  const resetRoster = () => setRoster([]);

  return (
    <PokemonContext.Provider
      value={{
        roster,
        addPokemonToRoster,
        removePokemonFromRoster,
        limitReached,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
