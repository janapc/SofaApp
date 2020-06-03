import React, { useState, useEffect } from "react";
import { TextInput, Text, Dimensions, Animated } from "react-native";
import axios from "axios";

import { Container } from "./styles";
import List from "../../components/List";
import { APIKEY } from "../../../env";

const DEVICE_WIDTH = Dimensions.get("window").width;

const Search: React.FC = () => {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  async function getSearch() {
    let url = `https://api.themoviedb.org/3/search/multi?api_key=${APIKEY}&language=en-US&query=${text}`;
    let { data } = await axios.get(url);
    let filterImage = data.results.filter((res) => res.poster_path);
    setItems(filterImage);
  }

  return (
    <Container>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search"
        keyboardType="default"
        returnKeyType="next"
        placeholderTextColor="#fff"
        style={{
          borderColor: "#FE346E",
          borderWidth: 1,
          height: 54,
          width: DEVICE_WIDTH / 1.1,
          borderRadius: 10,
          paddingLeft: 20,
          color: "#fff",
          marginTop: 20,
        }}
        onSubmitEditing={getSearch}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      {items && <List list={items} />}
    </Container>
  );
};

export default Search;
