import React, { useEffect, useState, useCallback } from "react";
import { AsyncStorage, ScrollView, RefreshControl } from "react-native";

import { Container, Header, Title } from "./styles";
import List from "../../components/List";
import api from "../../services/api";

const Favorite: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getFavorites();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await getFavorites();
    setRefreshing(false);
  }, [refreshing]);

  async function getFavorites() {
    let token = await AsyncStorage.getItem("@user:key");
    if (token) {
      let response = await api
        .get("/favorites", { headers: { token } })
        .catch((err) => err.response.data);
      setMovies(response.data.favorite);
    }
  }

  return (
    <Container>
      <Header>
        <Title>Favorite</Title>
      </Header>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fe346e"
          />
        }
      >
        {movies && <List list={movies} />}
      </ScrollView>
    </Container>
  );
};

export default Favorite;
