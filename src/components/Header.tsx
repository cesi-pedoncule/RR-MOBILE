import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import commonStyles from "../styles/commonStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import HomeButton from "./HomeButton";

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
            <HomeButton />
            <Text style={commonStyles.title}>
                { label }
            </Text>
        </View>
    );
}