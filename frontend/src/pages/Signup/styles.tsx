import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #121212;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Input = styled.TextInput`
  width: 80%;
  height: 54px;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  border-color: #fe346e;
  padding-left: 10px;
  border-width: 2px;
  margin: 10px 0;
  color: #fe346e;
`;

export const Button = styled.TouchableOpacity`
  width: 50%;
  height: 54px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  border-radius: 50px;
  background-color: #fe346e;
  margin: 8px 0;
  elevation: 5;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.2);
`;

export const TitleButton = styled.Text`
  color: #121212;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;
