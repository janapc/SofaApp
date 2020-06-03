import React from "react";
import { Dimensions } from "react-native";
import CarouselSnap from "react-native-snap-carousel";

import { PopularImage, Container } from "./styles";

const DEVICE_WIDTH = Dimensions.get("window").width;

interface IMovies {
  id: string;
  poster_path: string;
}

interface Props {
  movies: IMovies[];
}

const Carousel: React.FC<Props> = ({ movies }) => {
  return (
    <Container>
      <CarouselSnap
        layout={"default"}
        data={movies}
        loop={true}
        autoplay={true}
        lockScrollWhileSnapping={true}
        renderItem={({ item }) => (
          <PopularImage
            resizeMode="contain"
            source={{
              uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
            }}
          />
        )}
        sliderWidth={DEVICE_WIDTH}
        itemWidth={DEVICE_WIDTH}
      />
    </Container>
  );
};

export default Carousel;
