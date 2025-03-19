import { Link } from 'react-router-dom';
import { useUser } from '../context/userContext';

const Navbar = () => {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    // Optionally add further logic here, e.g. redirecting the user
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-black">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-green-400 text-2xl font-bold">
          Home
        </Link>
        {user && (
          <>
            <Link to="/roster" className="text-green-300 hover:text-green-400 transition-colors">
              My Roster
            </Link>
            <Link to="/battle" className="text-green-300 hover:text-green-400 transition-colors">
              Battle
            </Link>
            <Link
              to="/leaderboard"
              className="text-green-300 hover:text-green-400 transition-colors"
            >
              Leaderboard
            </Link>
          </>
        )}
      </div>
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="text-green-300 hover:text-green-400 transition-colors"
          >
            Logout
          </button>
        ) : (
          <Link to="/signin" className="text-green-300 hover:text-green-400 transition-colors">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
