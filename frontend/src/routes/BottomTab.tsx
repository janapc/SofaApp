import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { movies, tv } from "../utils/items";
import BottomTabComponent from "../components/BottomTab";
import Content from "../components/Content";
import Favorite from "../pages/Favorite";
import Search from "../pages/Search";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      tabBar={({ state, navigation }) => (
        <BottomTabComponent state={state} navigation={navigation} />
      )}
    >
      <Tab.Screen
        options={{
          headerTransparent: true,
          headerLeft: null,
          gestureEnabled: false,
          headerTitle: "",
        }}
        name="Movies"
      >
        {(props) => <Content category={movies} />}
      </Tab.Screen>
      <Tab.Screen
        options={{
          headerTransparent: true,
          headerLeft: null,
          gestureEnabled: false,
          headerTitle: "",
        }}
        name="TV"
      >
        {(props) => <Content category={tv} />}
      </Tab.Screen>
      <Tab.Screen
        options={{
          headerTransparent: true,
          headerLeft: null,
          gestureEnabled: false,
          headerTitle: "",
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          headerTransparent: true,
          headerLeft: null,
          gestureEnabled: false,
          headerTitle: "",
        }}
        name="Favorite"
        component={Favorite}
      />
    </Tab.Navigator>
  );
}
