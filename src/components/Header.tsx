import React from "react";
import { Text, View } from "react-native";
import commonStyles from "../styles/commonStyles";

interface Props {
    label: string;
}

export default function Header({ label}: Props) {

    return (
        <View style={commonStyles.header}>
            <Text numberOfLines={1} style={commonStyles.title}>
                { label }
            </Text>
        </View>
    );
}