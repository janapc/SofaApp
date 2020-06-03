import styled from "styled-components/native";

export const SimilarContainer = styled.View`
  margin: 10px 0;
`;

export const SimilarTitle = styled.Text`
  color: #fe346e;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

export const SimilarItem = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  width: 150px;
  margin-left: 10px;
  margin-bottom: 20px;
`;

export const SimilarImage = styled.Image`
  width: 150px;
  height: 200px;
`;
