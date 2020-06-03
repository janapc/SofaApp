import { APIKEY } from "../../env";

export const tv = [
  {
    id: 1,
    title: "Trending",
    uri: `https://api.themoviedb.org/3/trending/tv/week?api_key=${APIKEY}`,
  },
  {
    id: 2,
    title: "Popular",
    uri: `https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}`,
  },
  {
    id: 3,
    title: "Top Rated",
    uri: `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}`,
  },
];

export const movies = [
  {
    id: 1,
    title: "Trending",
    uri: `https://api.themoviedb.org/3/trending/movie/week?api_key=${APIKEY}`,
  },
  {
    id: 2,
    title: "Popular",
    uri: `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}`,
  },
  {
    id: 3,
    title: "Top Rated",
    uri: `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}`,
  },
];
