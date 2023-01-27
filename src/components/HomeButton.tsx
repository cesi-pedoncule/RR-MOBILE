import React from "react";
import { TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type HomeButtonStackParamList = {
    Home: undefined;
};
interface Props {
  style?: any;
}

export default function HomeButton({style} : Props) {
  const navigation = useNavigation<StackNavigationProp<HomeButtonStackParamList>>();

  const onPressButton = () => {
    navigation.navigate('Home');
  }

  return (
    <TouchableHighlight style={[style]} underlayColor="#FFFFFF" onPress={onPressButton}>
        <MaterialCommunityIcons name="home-outline" size={24} color="black" />
    </TouchableHighlight>
  );
}