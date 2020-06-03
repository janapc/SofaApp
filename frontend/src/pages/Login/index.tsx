import React, { useState, useEffect } from "react";
import { StatusBar, Text, AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Container, Input, Button, TitleButton } from "./styles";
import api from "../../services/api";
import Logo from "../../images/logo.svg";

interface Error {
  message?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<Error>({});

  const navigation = useNavigation();

  useEffect(() => {
    async function session() {
      let token = await AsyncStorage.getItem("@user:key");
      if (token) {
        let response = await api
          .get("/user", { headers: { token } })
          .catch((err) => err.response.data);

        await AsyncStorage.setItem("@user:key", response.data.token);
        navigation.navigate("BottomTab");
      }
    }
    session();
  }, []);

  async function handleLogin() {
    setError({});
    let response = await api
      .post("/login", { email, password })
      .catch((err) => err.response.data);
    if (response.error) setError({ message: response.error });
    else {
      await AsyncStorage.setItem("@user:key", response.data.token);
      navigation.navigate("BottomTab");
    }
  }

  return (
    <Container>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />
      <Logo width={80} />

      <Input
        placeholder="E-mail"
        value={email}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#FE346E"
        textContentType="emailAddress"
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Password"
        value={password}
        placeholderTextColor="#FE346E"
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
      />
      {error && error.message && (
        <Text
          style={{
            textAlign: "left",
            marginBottom: 20,
            color: "#d6495c",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {error.message}
        </Text>
      )}
      <Button color="#FE346E" onPress={handleLogin}>
        <TitleButton color="#121212">Login</TitleButton>
      </Button>
      <Button color="#202020" onPress={() => navigation.navigate("Signup")}>
        <TitleButton color="#FE346E">Create Account</TitleButton>
      </Button>
    </Container>
  );
};

export default Login;
