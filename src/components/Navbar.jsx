import { Link } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { FaHome, FaUsers, FaBattleNet, FaTrophy, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa6';

const Navbar = () => {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    // Optionally add further logic here, e.g., redirecting the user
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-black shadow-md">
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center text-green-400 text-2xl font-bold">
          <FaHome className="mr-2" /> Home
        </Link>
        {user && (
          <div className="flex space-x-4">
            <Link
              to="/roster"
              className="flex items-center text-green-300 hover:text-green-400 transition-colors"
            >
              <FaUsers className="mr-1" /> My Roster
            </Link>
            <Link
              to="/battle"
              className="flex items-center text-green-300 hover:text-green-400 transition-colors"
            >
              <FaBattleNet className="mr-1" /> Battle
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center text-green-300 hover:text-green-400 transition-colors"
            >
              <FaTrophy className="mr-1" /> Leaderboard
            </Link>
          </div>
        )}
      </div>
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center text-green-300 hover:text-red-400 transition-colors"
          >
            <FaSignOutAlt className="mr-1" /> Logout
          </button>
        ) : (
          <Link
            to="/signin"
            className="flex items-center text-green-300 hover:text-green-400 transition-colors"
          >
            <FaRegUser className="mr-1" /> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
