import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { searchMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";
import Dropdown from "../components/Dropdown";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [type, setType] = useState("movie");
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [typeError, setTypeError] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === "") {
      setIsLoading(true);
      setInputError(true);
      return;
    } else {
      setInputError(false);
    }
    const data = await searchMovies(query, type);
    setResults(data.results);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.searchTop}>Search Movie/TV Show Name*</Text>

      <View
        style={[styles.searchBarContainer, inputError && styles.errorBorder]}
      >
        <Feather name="search" size={24} color="grey" style={styles.icon} />
        <TextInput
          style={[styles.input, inputError && styles.errorInput]}
          placeholder="i.e. James Bond, CSI.."
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <Text style={styles.searchTop}>Choose Search Type*</Text>
      <View style={[styles.searchDropdown, typeError && styles.errorBorder]}>
        <View style={styles.DropdownInside}>
          <Dropdown
            selectedValue={type}
            onValueChange={setType}
            items={[
              { label: "Movie", value: "movie" },
              { label: "Multi", value: "multi" },
              { label: "TV", value: "tv" },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.searchButtonUI} onPress={handleSearch}>
          <Feather name="search" size={24} color="white" style={styles.icon1} />
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {inputError && (
        <Text style={styles.errorMessage}>Movie/TV show name is required</Text>
      )}

      <View style={styles.resultList}>
        {results.length === 0 ? (
          <Text style={styles.prompt}>Please initiate a search</Text>
        ) : (
          <MovieList
            movies={results}
            onMovieSelect={(id) =>
              navigation.navigate("MovieDetail", { movieId: id })
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 15,
  },
  prompt: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 120,
  },
  searchTop: {
    marginLeft: 35,
  },
  searchBarContainer: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#06b6d4",
    marginRight: 10,
    paddingLeft: 40,
    height: 40,
  },
  icon: {
    position: "relative",
    top: 7,
    left: 32,
  },
  searchDropdown: {
    flexDirection: "row",
    marginLeft: 25,
    marginTop: 10,
  },
  DropdownInside: {
    height: 62,
    width: 215,
    justifyContent: "center",
  },
  searchButtonUI: {
    flexDirection: "row",
    backgroundColor: "#06b6d4",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 38,
    marginLeft: 10,
    marginTop: 10,
    alignItems: "center",
  },
  icon1: {
    marginRight: 5,
  },
  searchButtonText: {
    color: "white",
  },
  resultList: {
    marginTop: 20,
  },
  errorBorder: {
    borderColor: "yellow",
  },
  errorInput: {
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    marginLeft: 35,
  },
});

export default SearchScreen;
