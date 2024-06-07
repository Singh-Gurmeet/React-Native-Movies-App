import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { fetchMovies } from '../api/tmdb';
import MovieList from '../components/MovieList';
import Dropdown from '../components/Dropdown';

const TVScreen = ({ navigation }) => {
  const [shows, setShows] = useState([]);
  const [category, setCategory] = useState('airing_today');

  useEffect(() => {
    const getShows = async () => {
      const data = await fetchMovies(`tv/${category}`);
      setShows(data.results);
    };
    getShows();
  }, [category]);

  return (
    <View style={styles.container}>
      <View style={styles.containerDrop}>
      <Dropdown
        selectedValue={category}
        onValueChange={setCategory}
        items={[
          { label: 'Airing Today', value: 'airing_today' },
          { label: 'On The Air', value: 'on_the_air' },
          { label: 'Popular', value: 'popular' },
          { label: 'Top Rated', value: 'top_rated' },
        ]}
      />
      </View>
      <MovieList movies={shows} onMovieSelect={(id) => navigation.navigate('MovieDetail', { movieId: id })} />
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
});

export default TVScreen;
