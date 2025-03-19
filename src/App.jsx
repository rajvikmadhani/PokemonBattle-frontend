import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Battle from './pages/Battle.jsx';
import Rooster from './pages/Rooster.jsx';
import Details from './pages/Details.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import { ToastContainer } from 'react-toastify';
import { PokemonProvider } from './context/pokemonContext.jsx';
import { UserProvider } from './context/userContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <UserProvider>
        <PokemonProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="details/:id" element={<Details />} />
                {/* Protected Routes */}
                <Route
                  path="roster"
                  element={
                    <ProtectedRoute>
                      <Rooster />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="battle"
                  element={
                    <ProtectedRoute>
                      <Battle />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="leaderboard"
                  element={
                    <ProtectedRoute>
                      <Leaderboard />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </Router>
        </PokemonProvider>
      </UserProvider>
      <ToastContainer />
    </>
  );
}

export default App;
