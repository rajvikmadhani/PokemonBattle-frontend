import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaTimes, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useUser } from '../context/userContext';

const Navbar = ({ isMusicOn, toggleMusic, handleSearch, searchTerm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useUser();

  const handleInputChange = e => {
    handleSearch(e.target.value);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="w-full flex items-center justify-between bg-[#2a0134] px-10 py-4 relative">
      {/* Pokémon Logo */}
      <motion.img
        src="/src/assets/logo.gif"
        alt="Pokémon"
        className="w-auto h-auto drop-shadow-[0_0_15px_#FFA500]"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* 🔥 Show Search Bar ONLY on Home Page */}
      {location.pathname === '/' && (
        <div className="relative flex items-center justify-center w-full mt-4">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={handleInputChange}
            className="w-64 px-4 py-2 text-white bg-black border-2 border-[#00FFFF] rounded-lg 
            focus:outline-none focus:ring-4 focus:ring-[#00FFFF] 
            placeholder-[#00FFFF] text-lg shadow-neon"
          />

          <button
            onClick={() => handleSearch('')}
            className="px-6 py-2 text-lg font-bold text-black bg-[#FF00FF] border-2 border-[#FF00FF] 
            rounded-lg transition duration-300 hover:bg-[#FF00FF] hover:text-white 
            hover:shadow-neon-pink active:scale-95"
          >
            Clear
          </button>
        </div>
      )}

      {/* Menu Button */}
      <div className="relative flex items-center justify-end w-full">
        <button onClick={() => setIsOpen(!isOpen)} className="hover:scale-110 transition">
          <img src="/src/assets/menu.gif" alt="Menu" className="w-20 h-20" />
        </button>

        {/* Game Menu Popup */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-16 right-0 bg-orange-500 text-white w-64 rounded-xl shadow-lg z-50 border-4 border-orange-800 p-4 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <>
                <ul className="w-full flex flex-col gap-4">
                  {['Home', 'Roster', 'Battle', 'Leaderboard'].map((page, index) => (
                    <li key={index}>
                      <Link
                        to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                        className="w-full text-lg font-bold text-white bg-orange-600 py-3 rounded-md shadow-md border-4 border-orange-300 uppercase flex items-center justify-center gap-2 hover:bg-orange-700 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        {page}
                      </Link>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={toggleMusic}
                  className={`mt-4 w-full text-lg font-bold py-1 rounded-lg shadow-md uppercase flex items-center justify-center gap-2 transition ${
                    isMusicOn
                      ? 'bg-blue-600 border-blue-300 text-white hover:bg-blue-700' // ON state (Blue)
                      : 'bg-green-600 border-red-300 text-white hover:bg-green-700' // OFF state (Red)
                  }`}
                >
                  {isMusicOn ? <FaVolumeUp size={20} /> : <FaVolumeMute size={20} />}
                  {isMusicOn ? 'Music On' : 'Music Off'}
                </button>

                <div className="mt-4">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="text-white text-lg font-bold uppercase py-3 rounded-md shadow-md bg-red-600 border-4 border-red-300 hover:bg-red-700 transition w-full"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/signin"
                      className="text-white text-lg font-bold uppercase py-3 rounded-md shadow-md bg-blue-600 border-4 border-blue-300 hover:bg-blue-700 transition w-full flex items-center justify-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                  )}
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-6 bg-red-600 w-10 h-10 flex items-center justify-center rounded-full border-4 border-red-200 shadow-md hover:bg-red-700 transition"
                >
                  <FaTimes size={20} />
                </button>
              </>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
