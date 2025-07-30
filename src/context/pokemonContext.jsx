import { createContext, useState, useContext, useEffect } from 'react';
import {
  fetchUser,
  fetchUserRoster,
  fetchUserScore,
  addPokemonToUserRoster,
  removePokemonFromUserRoster,
  resetUserRoster,
} from '../utils/databaseAPI.js';
import { useUser } from './UserContext.jsx'; // ✅ Import from UserContext

const PokemonContext = createContext();

export const usePokemon = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const { user } = useUser(); // ✅ Get user from context
  const [roster, setRoster] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      setLoading(true);
      try {
        const userData = await fetchUser(user.id);
        const userRoster = await fetchUserRoster(user.id);
        const userScore = await fetchUserScore(user.id);

        setRoster(userRoster);
        setScore(userScore);
        console.log('Successfully fetched user, roster, and score.');
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const addPokemonToRoster = async pokemon => {
    if (!user?.id) return false;

    if (roster.length >= 6) {
      setLimitReached(true);
      console.warn('Maximum of 6 Pokémon allowed.');
      return false;
    }

    try {
      await addPokemonToUserRoster(user.id, pokemon);
      setRoster(prev => [...prev, pokemon]);
      setLimitReached(false);
      console.log(`Pokémon ${pokemon.name} added to roster.`);
      return true;
    } catch (error) {
      console.error('Failed to add Pokémon to roster.');
      return false;
    }
  };

  const removePokemonFromRoster = async pokemonId => {
    if (!user?.id) return;

    try {
      await removePokemonFromUserRoster(user.id, pokemonId);
      setRoster(prev => prev.filter(p => p.id !== pokemonId));
      setLimitReached(false);
      console.log(`Pokémon ID ${pokemonId} removed from roster.`);
    } catch (error) {
      console.error('Failed to remove Pokémon.');
    }
  };

  const resetRoster = async () => {
    if (!user?.id) return;

    try {
      await resetUserRoster(user.id);
      setRoster([]);
      setLimitReached(false);
      console.log('Roster has been reset.');
    } catch (error) {
      console.error('Failed to reset roster.');
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        user,
        roster,
        score,
        addPokemonToRoster,
        removePokemonFromRoster,
        resetRoster,
        limitReached,
        loading,
        error,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
