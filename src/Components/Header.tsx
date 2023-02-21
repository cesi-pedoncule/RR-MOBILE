import React from "react";
import { Text, View } from "react-native";
import CommonStyles from "../Styles/CommonStyles";

interface Props {
    label: string;
}

export default function Header({ label}: Props) {

    return (
        <View style={CommonStyles.header}>
            <Text numberOfLines={1} style={CommonStyles.title}>
                { label }
            </Text>
        </View>
    );
}