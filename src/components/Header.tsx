import React from "react";
import { Text, View } from "react-native";
import commonStyles from "../styles/commonStyles";
import HomeButton from "./HomeButton";

interface Props {
    label: string;
}

export default function Header({label}: Props) {

    return (
        <View style={commonStyles.header}>
            <HomeButton />
            <Text style={commonStyles.title}>
                { label }
            </Text>
        </View>
    );
}