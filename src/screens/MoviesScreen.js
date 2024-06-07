import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { fetchMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";
import Dropdown from "../components/Dropdown";

const MoviesScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("now_playing");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovies(`movie/${category}`);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [category]);

  return (
    <View style={styles.container}>
      <View style={styles.containerDrop}>
        <Dropdown
          selectedValue={category}
          onValueChange={setCategory}
          items={[
            { label: "now_playing", value: "now_playing" },
            { label: "popular", value: "popular" },
            { label: "top_rated", value: "top_rated" },
            { label: "upcoming", value: "upcoming" },
          ]}
        />
      </View>
      {isLoading ? (
        <View style={[styles.container, styles.loader]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <MovieList
          movies={movies}
          onMovieSelect={(id) =>
            navigation.navigate("MovieDetail", { movieId: id })
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDrop: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MoviesScreen;
