import React, { useState, useEffect } from "react";
import { ImageBackground, AsyncStorage, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { HeaderContainer } from "./styles";
import api from "../../../services/api";

interface IMovies {
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  id: string;
}

interface Props {
  movie: IMovies;
}

const Header: React.FC<Props> = ({ movie }) => {
  const navigation = useNavigation();
  const [ative, setAtive] = useState(false);

  useEffect(() => {
    async function getFavorite() {
      const token = await AsyncStorage.getItem("@user:key");
      let response = await api
        .get("/favorites", {
          headers: {
            token: token,
          },
        })
        .catch((err) => err.response.data);
      let findFavorite = response.data.favorite.find(
        (favorite) => favorite.id == movie.id
      );
      if (findFavorite) setAtive(true);
      else setAtive(false);
    }
    getFavorite();
  }, [movie]);

  async function saveFavorite() {
    const token = await AsyncStorage.getItem("@user:key");
    let response = await api
      .post("/favorite", movie, {
        headers: {
          token: token,
        },
      })
      .catch((err) => err.response.data);
    if (response.error)
      Alert.alert("Sorry but this action is not possible at the moment");
    else setAtive(true);
  }

  async function deleteFavorite() {
    const token = await AsyncStorage.getItem("@user:key");
    let response = await api
      .delete(`/favorite/${movie.id}`, {
        headers: {
          token: token,
        },
      })
      .catch((err) => err.response.data);
    if (response.error)
      Alert.alert("Sorry but this action is not possible at the moment");
    else setAtive(false);
  }

  return (
    <ImageBackground
      style={{ width: "100%", height: 250 }}
      imageStyle={{ opacity: 0.8 }}
      source={{
        uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
      }}
    >
      <HeaderContainer style={{ paddingTop: 25 }}>
        <Feather
          onPress={() => navigation.goBack()}
          name="arrow-left"
          size={32}
          color="#FE346E"
        />
        {ative ? (
          <Feather
            onPress={deleteFavorite}
            name="thumbs-up"
            size={32}
            color="#FE346E"
          />
        ) : (
          <Feather
            onPress={saveFavorite}
            name="thumbs-up"
            size={32}
            color="#fff"
          />
        )}
      </HeaderContainer>
    </ImageBackground>
  );
};

export default Header;
