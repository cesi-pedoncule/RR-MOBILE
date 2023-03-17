import React from "react";
import { Client } from "rr-apilib";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { NavigationParamList } from "../../Types/navigation";
import { COLORS } from "../../Styles/Colors";

interface Props {
    client: Client;
    style?: StyleProp<ViewStyle>;
    navigation: NativeStackNavigationProp<NavigationParamList>;
}

export default function ResourcesButton({ style, navigation, client }: Props) {
    const onPressButton = () => {
        navigation.navigate('Resources', { client });
    }

    return (
        <TouchableOpacity style={[style]} onPress={onPressButton}>
            <MaterialCommunityIcons name="bookshelf" size={24} color={COLORS.Black} />
        </TouchableOpacity>
    );
}