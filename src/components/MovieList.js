import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const MovieList = ({ movies, onMovieSelect }) => (
  <FlatList
    data={movies}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => {
      // console.log(`f`,item);
      return (
        <View style={styles.movieContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.movieTitle}>{item.title || item.name}</Text>
            <Text style={styles.additionalInfo}>
              Popularity: {item.popularity}
            </Text>
            <Text style={styles.additionalInfo}>
              Release Date: {item.release_date}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => onMovieSelect(item.id)}
              >
                <Text style={styles.buttonText}>More Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }}
  />
);

const styles = StyleSheet.create({
  movieContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 40,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 120,
    height: 120,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 15,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  additionalInfo: {
    fontSize: 14,
    marginBottom: 5,
  },
  buttonContainer: {
    backgroundColor: "#06b6d4",
    borderRadius: 5,
    paddingVertical: 6,
    // paddingHorizontal: 20,
    // marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default MovieList;
