import React from "react";
import { TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TopbarStyles from "../styles/TopbarStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type HomeButtonStackParamList = {
    Home: undefined;
};

export default function HomeButton() {
  const navigation = useNavigation<StackNavigationProp<HomeButtonStackParamList>>();

  const onPressButton = () => {
    navigation.navigate('Home');
  }

  return (
    <TouchableHighlight style={TopbarStyles.btnHomeBackground} underlayColor="#FFFFFF" onPress={onPressButton}>
        <MaterialCommunityIcons name="home-outline" size={24} color="black" />
    </TouchableHighlight>
  );
}