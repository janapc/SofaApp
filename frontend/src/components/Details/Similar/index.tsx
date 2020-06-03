import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import { APIKEY } from "../../../../env";

import {
  SimilarContainer,
  SimilarImage,
  SimilarItem,
  SimilarTitle,
} from "./styles";

interface IMovie {
  id: string;
  name: string;
  media_type: string;
}

interface Props {
  movie: IMovie;
}

const Similar: React.FC<Props> = ({ movie }) => {
  const [similars, setSimilars] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function getSimilars() {
      let url =
        movie.media_type === "movie"
          ? `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=${APIKEY}&language=en-US`
          : `https://api.themoviedb.org/3/tv/${movie.id}/similar?api_key=${APIKEY}&language=en-US`;

      let { data } = await axios.get(url);
      let filter = data.results.slice(0, 10);
      setSimilars(filter);
    }
    getSimilars();
  }, [movie]);

  return (
    <>
      <SimilarContainer>
        <SimilarTitle>Similar</SimilarTitle>
        <FlatList
          horizontal
          data={similars}
          renderItem={({ item }) => (
            <SimilarItem
              onPress={() => {
                navigation.navigate("Details", { item });
              }}
            >
              <SimilarImage
                resizeMode="contain"
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                }}
              />
            </SimilarItem>
          )}
          keyExtractor={(item) => "key" + item.id}
        />
      </SimilarContainer>
    </>
  );
};

export default Similar;
