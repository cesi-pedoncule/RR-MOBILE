import React from "react";
import { Text, TouchableHighlight } from "react-native";
import commonStyles from "../styles/commonStyles";

interface Props {
    label: string;
    callBack: () => void;
}

export default function Link({label, callBack}: Props)
{
    return (
        <TouchableHighlight onPress={callBack} underlayColor={"#FFFFFF"}>
            <Text style={commonStyles.link}>{label}</Text>
        </TouchableHighlight>
    )
}