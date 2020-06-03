import React, { useState, useEffect, useCallback } from "react";
import { Animated } from "react-native";
import axios from "axios";

import { Container } from "./styles";
import Carousel from "../Carousel";
import { ContentListContext } from "../../Context/ContentListContext";
import Category from "../Category";
import List from "../List";

interface ICategory {
  id: number;
  title: string;
  uri: string;
  genre: string;
}

interface Props {
  category: ICategory[];
}

interface IMovies {
  id: string;
  poster_path: string;
}
const Content: React.FC<Props> = ({ category }) => {
  const [popular, setPopular] = useState<IMovies[]>([]);
  const [list, setList] = useState<IMovies[]>([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = useCallback(async () => {
    let popularMovies = category[1].uri;
    let { data } = await axios.get(popularMovies);
    setPopular(data.results.slice(0, 5));
  }, []);

  return (
    <Container>
      {popular && (
        <Animated.ScrollView stickyHeaderIndices={[1]}>
          <Carousel movies={popular} />
          <ContentListContext.Provider value={[list, setList]}>
            <Category category={category} />
          </ContentListContext.Provider>
          <List list={list} />
        </Animated.ScrollView>
      )}
    </Container>
  );
};

export default Content;
