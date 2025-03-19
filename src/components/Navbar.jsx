import { Link } from 'react-router-dom';
import { useUser } from '../context/userContext';

const Navbar = () => {
  const { user, logout } = useUser();
  console.log(user);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/roster">My Roster</Link>
          <Link to="/battle">Battle</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/signin">Sign In</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
