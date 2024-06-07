import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MoviesScreen from "./src/screens/MoviesScreen";
import TVScreen from "./src/screens/TVScreen";
import SearchScreen from "./src/screens/SearchScreen";
import MovieDetail from "./src/components/MovieDetail";

import Header from "./src/components/Header";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const MoviesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Movies"
      component={MoviesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={{ title: "" }}
    />
  </Stack.Navigator>
);

const TVStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="TV Shows"
      component={TVScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="MovieDetail" component={MovieDetail} />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="MovieDetail" component={MovieDetail} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <View style={styles.container}>
      <Header title="Movies App" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Movies" component={MoviesStack} />
          <Tab.Screen name="Search" component={SearchStack} />
          <Tab.Screen name="TV Shows" component={TVStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
