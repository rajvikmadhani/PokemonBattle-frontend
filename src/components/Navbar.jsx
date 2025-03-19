import { Link } from 'react-router';

const Navbar = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="rooster">My Roster</Link>
        <Link to="battle">Battle</Link>
        <Link to="leaderboard">Leaderboard</Link>
        <Link to="signin">Signin</Link>
      </nav>
    </div>
  );
};

export default Navbar;
