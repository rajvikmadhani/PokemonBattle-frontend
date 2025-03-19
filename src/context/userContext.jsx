import { createContext, useContext, useState, useEffect } from 'react';
import { signinUser, signupUser } from '../utils/databaseAPI.js';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || null);

  const login = async credentials => {
    try {
      // credentials: { email, password }
      const response = await signinUser(credentials);
      console.log('response', response);

      // Assuming response has { token, user }
      setUser(response.user);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (error) {
      console.error('Failed to sign in:', error);
      // Optionally handle or display an error message
    }
  };

  const signup = async newUserData => {
    try {
      const data = await signupUser(newUserData);
      console.log(data);
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check if a user is saved
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};
