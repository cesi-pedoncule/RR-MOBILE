import React from 'react'
import { TouchableHighlight } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import ReturnButtonStyles from '../../styles/Component/ReturnButtonStyles';

type ReturnButtonStackParamList = {
    ShareCreate: undefined;
};

export default function ReturnButton() {
    const navigation = useNavigation<StackNavigationProp<ReturnButtonStackParamList>>();

  return (
    <TouchableHighlight style={ReturnButtonStyles.returnBtn} underlayColor="#FFFFFF" onPress={() => navigation.goBack()}>
      <MaterialCommunityIcons name="arrow-left-top" size={24} color="black" />
    </TouchableHighlight>
  )
}