import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Battle from "./pages/Battle.jsx";
import Rooster from "./pages/Rooster.jsx";
import Details from "./pages/Details.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="rooster">My Rooster</Link>
                <Link to="battle">Battle</Link>
                <Link to="leaderboard">LeaderBoard</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="rooster" element={<Rooster />} />
                <Route path="details/:id" element={<Details />} />
                <Route path="battle" element={<Battle />} />
                <Route path="leaderboard" element={<Leaderboard />} />
            </Routes>
        </Router>
    );
}

export default App;
