import { useState, useEffect } from 'react';
import { getAllPokemon } from '../utils/pokemonAPI';
import Card from '../components/card';
import { motion, AnimatePresence } from 'framer-motion';

const Home = ({ isMusicOn, searchTerm }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getAllPokemon();
        setPokemonList(data);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };
    fetchPokemon();
  }, []);

  // ✅ Apply search filter AFTER pokemonList is available
  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic (Now applies to filtered list)
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 bg-[#2a0134] min-h-screen font-vt323">
      {/* Pokémon Cards */}
      <div className="relative flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {currentPokemon.length > 0 ? (
              currentPokemon.map(pokemon => (
                <motion.div
                  key={pokemon.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card pokemon={pokemon} isMusicOn={isMusicOn} />
                </motion.div>
              ))
            ) : (
              <p className="text-center text-white">No Pokémon found</p>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-full shadow-md transition ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'text-white'
              }`}
            >
              ◀
            </button>

            <span className="text-yellow-400 pt-2 text-lg">
              Page {currentPage} of {totalPages || 1}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full shadow-md transition ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'text-white'
              }`}
            >
              ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
