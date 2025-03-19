import axios from 'axios';

const API_USERS_URL = '/users';
const API_LEADERBOARD_URL = '/leaderboard';
const API_AUTH_URL = '/auth';

// Fetch single user by ID (GET /users/:id)
export const fetchUser = async userId => {
  try {
    const response = await axios.get(`${API_USERS_URL}/${userId}`);
    console.log('Fetched user data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error.message);
    throw new Error('Failed to fetch user. Please try again later.');
  }
};

// Fetch User Score (GET /users/:id/score)
export const fetchUserScore = async userId => {
  try {
    const response = await axios.get(`${API_LEADERBOARD_URL}/${userId}/score`);
    console.log('Fetched user score:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user score:', error.message);
    throw new Error('Failed to fetch score. Please try again later.');
  }
};

// Fetch user roster (GET /users/:id)
export const fetchUserRoster = async userId => {
  try {
    const response = await axios.get(`${API_LEADERBOARD_URL}/${userId}`);
    console.log('Fetched user roster:', response.data.roster);
    return response.data.roster; // Return Pokémon-IDs
  } catch (error) {
    console.error('Failed to fetch user roster:', error.message);
    throw new Error('Failed to fetch roster. Please try again later.');
  }
};

// Add Pokémon to roster (PUT /users/:id/roster)
export const addPokemonToUserRoster = async (userId, pokemonId) => {
  try {
    const response = await axios.put(`${API_LEADERBOARD_URL}/${userId}/roster`, {
      action: 'add',
      pokemonId,
    });
    console.log('Added Pokémon to roster:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to add Pokémon to roster:', error.message);
    throw new Error('Failed to add Pokémon. Please try again later.');
  }
};

// Remove Pokémon from roster (PUT /users/:id/roster)
export const removePokemonFromUserRoster = async (userId, pokemonId) => {
  try {
    const response = await axios.put(`${API_LEADERBOARD_URL}/${userId}/roster`, {
      action: 'remove',
      pokemonId,
    });
    console.log('Removed Pokémon from roster:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to remove Pokémon from roster:', error.message);
    throw new Error('Failed to remove Pokémon. Please try again later.');
  }
};

// Reset entire roster (PUT /users/:id/roster)
export const resetUserRoster = async userId => {
  try {
    const response = await axios.put(`${API_LEADERBOARD_URL}/${userId}/roster`, {
      action: 'reset',
    });
    console.log('Roster reset for user:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to reset roster:', error.message);
    throw new Error('Failed to reset roster. Please try again later.');
  }
};

//pull leaderboard
export const fetchLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_LEADERBOARD_URL}`);
    console.log('Fetched leaderboard:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error.message);
    throw new Error('Failed to fetch leaderboard. Please try again later.');
  }
};

export const signupUser = async newUserData => {
  try {
    console.log(API_USERS_URL);
    console.log(newUserData);
    const response = await axios.post(API_USERS_URL, newUserData);
    console.log('User signed up:', response.data);
    return response.data;
  } catch (error) {
    console.error('Sign-up failed:', error.message);
    throw new Error('Failed to sign up. Please try again later.');
  }
};

export const signinUser = async userCredentials => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/login`, userCredentials);
    console.log('User signed in:', response.data);
    return response.data;
  } catch (error) {
    console.error('Sign-in failed:', error.message);
    throw new Error('Failed to sign in. Please check your credentials.');
  }
};
