import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Battle from './pages/Battle';
import Roster from './pages/Roster';
import Details from './pages/Details';
import Leaderboard from './pages/Leaderboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import MainLayout from './layouts/MainLayout';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';

import { PokemonProvider } from './context/PokemonContext.jsx'; // ✅ Exact match!
import { UserProvider } from './context/UserContext.jsx'; // ✅ Exact match!

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(() => {
    return JSON.parse(localStorage.getItem('isMusicOn')) ?? true;
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('isMusicOn', JSON.stringify(isMusicOn));
  }, [isMusicOn]);

  const toggleMusic = () => setIsMusicOn(prev => !prev);
  const handleSearch = term => setSearchTerm(term);

  return (
    <UserProvider>
      <PokemonProvider>
        <Router>
          {isLoading ? (
            <Loader />
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <MainLayout
                    isMusicOn={isMusicOn}
                    toggleMusic={toggleMusic}
                    handleSearch={handleSearch}
                  />
                }
              >
                <Route index element={<Home isMusicOn={isMusicOn} searchTerm={searchTerm} />} />
                <Route path="home" element={<Navigate to="/" replace />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="details/:id" element={<Details />} />

                <Route
                  path="roster"
                  element={
                    <ProtectedRoute>
                      <Roster />
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
          )}
        </Router>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
      </PokemonProvider>
    </UserProvider>
  );
}

export default App;
