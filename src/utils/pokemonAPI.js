// 	• getAllPokemon(limit) → Fetch Pokémon with limit.
//	• getPokemonById(id) → Fetch Pokémon by ID.
//	• getRandomPokemon() → Fetch random Pokémon (e.g. for battle).

import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

// Fetch the first 151 Pokémon (Gen 1 - Kanto Region)
export const getAllPokemon = async () => {
  try {
    const response = await axios.get(`${API_URL}?limit=151`);
    console.log("Successfully fetched all Pokémon:", response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch all Pokémon:", error.message);
    throw new Error("Failed to fetch Pokémon list. Please try again later.");
  }
};

// Fetch a Pokémon by ID
export const getPokemonById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log(`Successfully fetched Pokémon with ID ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Pokémon with ID ${id}:`, error.message);
    throw new Error(
      `Failed to fetch Pokémon details for ID ${id}. Please try again later.`
    );
  }
};

// Get a random Pokémon (from the first 151 Pokémon)
export const getRandomPokemon = async () => {
  try {
    const randomId = Math.floor(Math.random() * 151) + 1;
    const randomPokemon = await getPokemonById(randomId);
    console.log("Successfully fetched a random Pokémon:", randomPokemon);
    return randomPokemon;
  } catch (error) {
    console.error("Failed to fetch a random Pokémon:", error.message);
    throw new Error(
      "Failed to fetch a random Pokémon. Please try again later."
    );
  }
};
