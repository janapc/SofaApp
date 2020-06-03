import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: ${(props: { width: number }) => `${props.width / 2}px`};
  height: 250px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
`;

export const ItemImage = styled.Image`
  width: 100%;
  height: 100%;
`;
