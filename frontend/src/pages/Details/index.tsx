import React from "react";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Container } from "./styles";
import Header from "../../components/Details/Header";
import Description from "../../components/Details/Description";
import Cast from "../../components/Details/Cast";
import Similar from "../../components/Details/Similar";

const Details: React.FC = () => {
  const route = useRoute();

  return (
    <Container>
      <ScrollView>
        <Header movie={route.params.item} />
        <Description movie={route.params.item} />
        <Cast movie={route.params.item} />
        <Similar movie={route.params.item} />
      </ScrollView>
    </Container>
  );
};

export default Details;
