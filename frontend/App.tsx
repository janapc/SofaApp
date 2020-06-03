import React from "react";
import { StatusBar } from "react-native";

import Routes from "./src/routes/routes";

console.disableYellowBox = true;

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
    </>
  );
}
