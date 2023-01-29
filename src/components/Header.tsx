import React from "react";
import { Text, View } from "react-native";
import commonStyles from "../styles/commonStyles";
import HomeButton from "./Button/HomeButton";

interface Props {
    label: string;
    displayHomeButton?: boolean;
}

export default function Header({ label, displayHomeButton=true }: Props) {

    const getTitleStyle = () => {
        if (label.length < 10) {
            return commonStyles.title1;
        } else if (label.length < 16) {
            return commonStyles.title2;
        } else if (label.length < 24) {
            return commonStyles.title3;
        }
        return commonStyles.title;
    }

    return (
        <View style={commonStyles.header}>
            {
                displayHomeButton ?
                <HomeButton style={commonStyles.btnHomeBackground} />
                : null
            }
            <Text style={[commonStyles.title, getTitleStyle()]}>
                { label }
            </Text>
        </View>
    );
}