import axios from 'axios';

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_USERS_URL = `${BACKEND_URL}/users`;
const API_AUTH_URL = `${BACKEND_URL}/auth`;
const API_LEADERBOARD_URL = `${BACKEND_URL}/leaderboard`;

// 🔎 Get a user by ID
export const fetchUser = async userId => {
  try {
    const { data } = await axios.get(`${API_USERS_URL}/${userId}`);
    console.log('Fetched user data:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error.message);
    throw new Error('Failed to fetch user. Please try again later.');
  }
};

// 🔢 Get user score (if implemented)
export const fetchUserScore = async userId => {
  try {
    const { data } = await axios.get(`${API_USERS_URL}/${userId}/score`);
    console.log('Fetched user score:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch user score:', error.message);
    throw new Error('Failed to fetch score. Please try again later.');
  }
};

// 🎒 Get user roster
export const fetchUserRoster = async userId => {
  try {
    const { data } = await axios.get(`${API_USERS_URL}/${userId}`);
    console.log('Fetched user roster:', data.roster);
    return data.roster;
  } catch (error) {
    console.error('Failed to fetch user roster:', error.message);
    throw new Error('Failed to fetch roster. Please try again later.');
  }
};

// ➕ Add Pokémon to user roster
export const addPokemonToUserRoster = async (userId, pokemonId) => {
  try {
    const { data } = await axios.put(`${API_USERS_URL}/${userId}/roster`, {
      action: 'add',
      pokemonId,
    });
    console.log('Added Pokémon to roster:', data);
    return data;
  } catch (error) {
    console.error('Failed to add Pokémon to roster:', error.message);
    throw new Error('Failed to add Pokémon. Please try again later.');
  }
};

// ➖ Remove Pokémon from user roster
export const removePokemonFromUserRoster = async (userId, pokemonId) => {
  try {
    const { data } = await axios.put(`${API_USERS_URL}/${userId}/roster`, {
      action: 'remove',
      pokemonId,
    });
    console.log('Removed Pokémon from roster:', data);
    return data;
  } catch (error) {
    console.error('Failed to remove Pokémon from roster:', error.message);
    throw new Error('Failed to remove Pokémon. Please try again later.');
  }
};

// 🔄 Reset user's roster
export const resetUserRoster = async userId => {
  try {
    const { data } = await axios.put(`${API_USERS_URL}/${userId}/roster`, {
      action: 'reset',
    });
    console.log('Roster reset for user:', data);
    return data;
  } catch (error) {
    console.error('Failed to reset roster:', error.message);
    throw new Error('Failed to reset roster. Please try again later.');
  }
};

// 🏆 Get leaderboard
export const fetchLeaderboard = async () => {
  try {
    const { data } = await axios.get(API_LEADERBOARD_URL);
    console.log('Fetched leaderboard:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error.message);
    throw new Error('Failed to fetch leaderboard. Please try again later.');
  }
};

// 📝 Sign up a new user
export const signupUser = async newUserData => {
  try {
    const { data } = await axios.post(API_USERS_URL, newUserData);
    console.log('User signed up:', data);
    return data;
  } catch (error) {
    console.error('Sign-up failed:', error.message);
    throw new Error('Failed to sign up. Please try again later.');
  }
};

// 🔐 Sign in
export const signinUser = async userCredentials => {
  try {
    const { data } = await axios.post(`${API_AUTH_URL}/login`, userCredentials);
    console.log('User signed in:', data);
    return data;
  } catch (error) {
    console.error('Sign-in failed:', error.message);
    throw new Error('Failed to sign in. Please check your credentials.');
  }
};
