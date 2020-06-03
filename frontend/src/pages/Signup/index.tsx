import React, { useState } from "react";
import { StatusBar, AsyncStorage, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Container, Input, Button, TitleButton } from "./styles";
import api from "../../services/api";
import Logo from "../../images/logo.svg";

interface Error {
  message?: string;
}

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<Error>({});

  const navigation = useNavigation();

  async function handleLogin() {
    setError({});
    let user = await api
      .post("/user", { email, password })
      .catch((err) => err.response.data);
    if (user.error) setError({ message: user.error });

    let response = await api
      .post(`/session/${user.data.id}`)
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
        textContentType="emailAddress"
        onChangeText={(text) => setPassword(text)}
      />
      {error.message && (
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
      <Button onPress={handleLogin}>
        <TitleButton>Login</TitleButton>
      </Button>
    </Container>
  );
};

export default Signup;
