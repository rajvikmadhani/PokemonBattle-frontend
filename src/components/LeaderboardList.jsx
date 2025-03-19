import styles from '../styles/Leaderboard.module.css';
import React, { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../utils/databaseAPI.js';
import { getPokemonById } from '../utils/pokemonAPI.js';

const LeaderboardList = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entries = await fetchLeaderboard();
        const updatedEntries = await Promise.all(
          entries.map(async entry => {
            const pokemonDetails = await Promise.all(
              entry.roster.map(async pokemonId => {
                const pokemon = await getPokemonById(pokemonId);
                return pokemon;
              })
            );
            return { ...entry, pokemonDetails };
          })
        );
        setLeaderboard(updatedEntries);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      {/* Make the container scroll horizontally if content is wide */}
      <div className="overflow-x-auto w-full">
        {/* Give the table a minimum width so columns aren’t too narrow */}
        <table className={`min-w-[900px] w-full text-left ${styles.gameboyTable}`}>
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b">Rank</th>
              <th className="px-4 py-2 border-b">Player</th>
              <th className="px-4 py-2 border-b">Deck</th>
              <th className="px-4 py-2 border-b">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard && leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr key={entry.id} className="hover:bg-slate-400">
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">{entry.username}</td>
                  <td className="px-4 py-3 border-b">
                    {entry.pokemonDetails && entry.pokemonDetails.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {entry.pokemonDetails.map(pokemon => (
                          <img
                            key={pokemon.id}
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className="w-20 h-20 object-contain"
                          />
                        ))}
                      </div>
                    ) : (
                      'No deck available'
                    )}
                  </td>
                  <td className="px-4 py-3 border-b">{entry.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-4 py-3">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardList;
