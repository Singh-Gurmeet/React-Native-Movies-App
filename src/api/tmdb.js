import axios from "axios";

const API_KEY = "1fc34389a5e1722bc24b04d394ff47cd";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovieById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    throw error;
  }
};

export const searchMovies = async (query, type) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/${type}`, {
      params: {
        api_key: API_KEY,
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};
