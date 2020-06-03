import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../pages/Login";
import BottomTab from "./BottomTab";
import Signup from "../pages/Signup";
import Details from "../pages/Details";

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerTitleAlign: "center",
            headerTitle: "",
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerTitleAlign: "center",
            headerTintColor: "#FE346E",
            headerTitle: "Create Account",
          }}
          name="Signup"
          component={Signup}
        />
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerLeft: null,
            gestureEnabled: false,
            headerTitle: "",
          }}
          name="BottomTab"
          component={BottomTab}
        />

        <Stack.Screen
          options={{
            headerTransparent: true,
            headerLeft: null,
            gestureEnabled: false,
            headerTitle: "",
          }}
          name="Details"
          component={Details}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
