import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from 'react-native'
import NavBar from "../components/NavBar";
import commonStyles from "../styles/commonStyles";

export default function ProfilScreen() {
  return (
    <View style={commonStyles.container}>
      <Text>ProfilScreen</Text>
      <NavBar/>
    </View>
  )
}