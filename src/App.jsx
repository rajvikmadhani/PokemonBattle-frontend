import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Battle from "./pages/Battle.jsx";
import Rooster from "./pages/Rooster.jsx";
import Details from "./pages/Details.jsx";
import { PokemonProvider } from "./context/pokemonContext.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import { UserProvider } from "./context/userContext";
import SignIn from "./pages/SignIn";

function App() {
    return (
        <UserProvider>
            <PokemonProvider>
                <Router>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="roster">My Roster</Link>
                        <Link to="battle">Battle</Link>
                        <Link to="leaderboard">Leaderboard</Link>
                    </nav>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="details/:id" element={<Details />} />
                        {/* to be replaced once sign in & up is implemented*/}
                        <Route path="roster" element={<Rooster />} />
                        {/* to be replaced once sign in & up is implemented*/}
                        <Route path="battle" element={<Battle />} />
                        <Route path="leaderboard" element={<Leaderboard />} />
                        {/* Protected routes
            <Route
              path="/rooster"
              element={
                <ProtectedRoute>
                  <Rooster />
                </ProtectedRoute>
              }
            />
            <Route
              path="/battle"
              element={
                <ProtectedRoute>
                  <Battle />
                </ProtectedRoute>
              }
            /> */}
                    </Routes>
                </Router>
            </PokemonProvider>
        </UserProvider>
    );
}

export default App;
