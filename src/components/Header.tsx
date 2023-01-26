import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import commonStyles from "../styles/commonStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
    label: string;
}

type LoginStackParamList = {
    Home: undefined;
};

export default function Header({label}: Props) {
    const navigation = useNavigation<StackNavigationProp<LoginStackParamList>>();

    const onPressIcon = () => {
        navigation.navigate('Home');
    } 

    return (
        <View style={commonStyles.header}>
            <TouchableHighlight onPress={onPressIcon} underlayColor={"#FFFFFF"}>
                <MaterialCommunityIcons name="home-outline" size={24} color="black" />
            </TouchableHighlight>
            <Text style={commonStyles.title}>
                { label }
            </Text>
        </View>
    );
}