import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from 'react-native'
import NavBar from "../components/NavBar";
import commonStyles from "../styles/commonStyles";

export default function CategoriesScreen() {
  return (
    <View style={commonStyles.container}>
      <Text>CategoriesScreen</Text>
      <NavBar/>
    </View>
  )
}