import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import axios from "axios";

import {
  CastContainer,
  CastTitle,
  CastItem,
  CastImage,
  CastName,
} from "./styles";
import { APIKEY } from "../../../../env";

interface IMovie {
  id: string;
  name: string;
  media_type: string;
}

interface Props {
  movie: IMovie;
}

const Cast: React.FC<Props> = ({ movie }) => {
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    async function getCasts() {
      let url =
        movie.media_type === "movie"
          ? `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${APIKEY}&language=en-US`
          : `https://api.themoviedb.org/3/tv/${movie.id}/credits?api_key=${APIKEY}&language=en-US`;

      let { data } = await axios.get(url);
      let filter = data.cast.slice(0, 10);
      setCasts(filter);
    }
    getCasts();
  }, [movie]);

  return (
    <CastContainer>
      <CastTitle>Cast</CastTitle>
      <FlatList
        horizontal
        data={casts}
        renderItem={({ item }) => (
          <CastItem>
            <CastImage
              resizeMode="contain"
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.profile_path}`,
              }}
            />
            <CastName numberOfLines={2}>{item.name}</CastName>
          </CastItem>
        )}
        keyExtractor={(item) => "key" + item.id}
      />
    </CastContainer>
  );
};

export default Cast;
