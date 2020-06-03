import React from "react";
import { Dimensions, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ItemImage, Container } from "./styles";

const DEVICE_WIDTH = Dimensions.get("window").width;

interface IList {
  id: string;
  poster_path: string;
}

interface Props {
  list: IList[];
}

const List: React.FC<Props> = ({ list }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      style={{
        marginTop: 25,
        width: DEVICE_WIDTH,
      }}
      data={list}
      numColumns={2}
      renderItem={({ item }) => (
        <Container
          width={DEVICE_WIDTH}
          onPress={() => {
            navigation.navigate("Details", { item });
          }}
        >
          {item.poster_path ? (
            <ItemImage
              resizeMode="contain"
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
              }}
            />
          ) : (
            <Text
              style={{
                color: "#FE346E",
              }}
            >
              Image not found
            </Text>
          )}
        </Container>
      )}
      keyExtractor={(item) => "key" + item.id}
    />
  );
};

export default List;
