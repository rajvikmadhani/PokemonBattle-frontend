import { createContext, useContext, useState, useEffect } from 'react';
import { signinUser, signupUser } from '../utils/databaseAPI';
import { getAuth } from '../utils/authHelper';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login handler
  const login = async credentials => {
    try {
      const { token, user } = await signinUser(credentials);
      setUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  // Signup handler
  const signup = async newUserData => {
    try {
      const { user } = await signupUser(newUserData);
      return user;
    } catch (error) {
      console.error('Signup failed:', error.message);
      throw error;
    }
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Load user on app startup
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getAuth(token)
        .then(user => {
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
        .catch(err => {
          console.error('Token invalid or expired:', err.message);
          logout();
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};
