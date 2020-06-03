import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

import {
  Title,
  GenresContainer,
  GenresNames,
  RatingContainer,
  DescriptionContainer,
  Overview,
  DescriptionItem,
  DescriptionTitle,
  DescriptionValue,
} from "./styles";
import { APIKEY } from "../../../../env";

const ratings = [10, 25, 50, 75, 100];

interface IMovie {
  name: string;
  overview: string;
  title: string;
  media_type: string;
  vote_average: number;
}

interface Iitem {
  year: string;
  country: string;
  length: string;
  seasons: string;
  episodes: string;
  genres: [];
}

interface Props {
  movie: IMovie;
}

const Description: React.FC<Props> = ({ movie }) => {
  const [item, setItem] = useState<Iitem>({});

  useEffect(() => {
    async function getDetails() {
      let url =
        movie.media_type === "movie"
          ? `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${APIKEY}&language=en-US`
          : `https://api.themoviedb.org/3/tv/${movie.id}?api_key=${APIKEY}&language=en-US`;
      let { data } = await axios.get(url);
      let json = {
        year: data.release_date || data.first_air_date.split("-")[0],
        country: data.origin_country
          ? data.origin_country[0]
          : data.production_countries[0].iso_3166_1,
        length: `${data.runtime || data.episode_run_time[0]}min`,
        seasons: data.number_of_seasons || "",
        episodes: data.number_of_episodes || "",
        genres: data.genres,
      };
      setItem(json);
    }
    getDetails();
  }, [movie]);

  function description(movie: object) {
    let item = [];
    for (let [key, value] of Object.entries(movie)) {
      if (value)
        item.push(
          <DescriptionItem key={key}>
            <DescriptionTitle>{key}</DescriptionTitle>
            <DescriptionValue>{value}</DescriptionValue>
          </DescriptionItem>
        );
    }
    return item;
  }
  return (
    <>
      <Title>{movie.title || movie.name}</Title>

      {item.genres && (
        <GenresContainer>
          {item.genres.map((genre: { name: string }) => (
            <GenresNames>{genre.name}</GenresNames>
          ))}
        </GenresContainer>
      )}

      <RatingContainer>
        {ratings.map((rat, index) =>
          movie.vote_average * 10 >= rat ? (
            <Feather
              key={index}
              name="star"
              style={{ margin: 2 }}
              size={24}
              color="#FE346E"
            />
          ) : (
            <Feather
              key={index}
              name="star"
              size={24}
              style={{ margin: 2 }}
              color="#b1b1b1"
            />
          )
        )}
      </RatingContainer>

      {item && (
        <DescriptionContainer>
          {description({
            Year: item.year,
            Country: item.country,
            Length: item.length,
            Seasons: item.seasons,
            Episodes: item.episodes,
          })}
        </DescriptionContainer>
      )}

      <Overview>{movie.overview}</Overview>
    </>
  );
};

export default Description;
