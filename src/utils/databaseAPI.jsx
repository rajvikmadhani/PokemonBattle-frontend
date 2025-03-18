import axios from "axios";

const API_URL = "http://localhost:3000/users";

// Fetch single user by ID (GET /users/:id)
export const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    console.log("Fetched user data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    throw new Error("Failed to fetch user. Please try again later.");
  }
};

// Fetch User Score (GET /users/:id/score)
export const fetchUserScore = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}/score`);
    console.log("Fetched user score:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user score:", error.message);
    throw new Error("Failed to fetch score. Please try again later.");
  }
};

// Fetch user roster (GET /users/:id)
export const fetchUserRoster = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    console.log("Fetched user roster:", response.data.roster);
    return response.data.roster; // Gibt direkt die Pokémon-IDs zurück
  } catch (error) {
    console.error("Failed to fetch user roster:", error.message);
    throw new Error("Failed to fetch roster. Please try again later.");
  }
};

// Add Pokémon to roster (PUT /users/:id/roster)
export const addPokemonToUserRoster = async (userId, pokemonId) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}/roster`, {
      action: "add",
      pokemonId,
    });
    console.log("Added Pokémon to roster:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to add Pokémon to roster:", error.message);
    throw new Error("Failed to add Pokémon. Please try again later.");
  }
};

// Remove Pokémon from roster (PUT /users/:id/roster)
export const removePokemonFromUserRoster = async (userId, pokemonId) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}/roster`, {
      action: "remove",
      pokemonId,
    });
    console.log("Removed Pokémon from roster:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to remove Pokémon from roster:", error.message);
    throw new Error("Failed to remove Pokémon. Please try again later.");
  }
};

// Reset entire roster (PUT /users/:id/roster)
export const resetUserRoster = async (userId) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}/roster`, {
      action: "reset",
    });
    console.log("Roster reset for user:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to reset roster:", error.message);
    throw new Error("Failed to reset roster. Please try again later.");
  }
};
