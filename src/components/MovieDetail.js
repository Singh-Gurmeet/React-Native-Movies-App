import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { fetchMovieById } from "../api/tmdb";

const MovieDetail = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const data = await fetchMovieById(movieId);
      setMovie(data);
      navigation.setOptions({ title: data.title });
    };
    getMovie();
  }, [movieId, navigation]);

  if (!movie) return null;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{movie.title}</Text>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
        />

        <Text style={styles.overview}>{movie.overview}</Text>
        <View style={styles.bottomContainer}>
          <Text style={styles.popularity}>Popularity: {movie.popularity}</Text>
          <Text> | </Text>
          <Text style={styles.release_date}>
            Release Date: {movie.release_date}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 250,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    paddingBottom: 30,
    fontWeight: "bold",
  },
  overview: {
    marginTop: 10,
    fontSize: 16,
  },
  bottomContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
});

export default MovieDetail;
