import React, { useEffect, useContext, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import axios from "axios";

import { CategoryItem, CategoryTitle } from "./styles";

import { ContentListContext } from "../../Context/ContentListContext";

const DEVICE_WIDTH = Dimensions.get("window").width;

interface ICategory {
  id: number;
  title: string;
  uri: string;
  genre: string;
}

interface Props {
  category: ICategory[];
}

const Category: React.FC<Props> = ({ category }) => {
  const [list, setList] = useContext(ContentListContext);
  const [indexItem, setIndexItem] = useState(0);

  useEffect(() => {
    getList();
  }, []);

  async function getList(
    uri: string = category[0].uri,
    id: number = category[0].id
  ) {
    let { data } = await axios.get(uri);
    let filter = data.results.filter((res) => res.poster_path);
    setList([...filter]);
    setIndexItem(id);
  }

  return (
    <>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        style={{
          width: DEVICE_WIDTH,
          backgroundColor: "#121212",
        }}
        data={category}
        renderItem={({ item }) => (
          <CategoryItem
            key={item.id}
            onPress={(event) => getList(item.uri, item.id)}
          >
            {item.id === indexItem ? (
              <CategoryTitle style={{ color: "#fe346e" }}>
                {item.title}
              </CategoryTitle>
            ) : (
              <CategoryTitle style={{ color: "#353535" }}>
                {item.title}
              </CategoryTitle>
            )}
          </CategoryItem>
        )}
        keyExtractor={(item) => "key" + item.id}
      />
    </>
  );
};

export default Category;
