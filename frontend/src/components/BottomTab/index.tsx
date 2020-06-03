import React, { useState, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Container, Menu, TitleIcon } from "./styles";
import { listTabs } from "./listTabs";

const BottomTab: React.FC = ({ navigation }) => {
  const [checkTab, setCheckTab] = useState(0);

  const onSelect = useCallback(
    (id: number, title: string) => {
      setCheckTab(id);
      navigation.navigate(title);
    },
    [listTabs]
  );

  return (
    <Container>
      {listTabs.map(({ name, title, id }) => (
        <TouchableOpacity
          style={{ width: 100 }}
          key={id}
          onPress={() => onSelect(id, title)}
        >
          {id === checkTab ? (
            <Menu style={{ padding: 5 }}>
              <Feather name={name} size={24} color={"#fe346e"} />
              <TitleIcon>{title}</TitleIcon>
            </Menu>
          ) : (
            <Menu>
              <Feather name={name} size={24} color={"#353535"} />
            </Menu>
          )}
        </TouchableOpacity>
      ))}
    </Container>
  );
};

export default BottomTab;
