import React from "react";
import { Text, TouchableHighlight } from "react-native";
import CommonStyles from "../../Styles/CommonStyles";

interface Props {
    label: string;
    callBack: () => void;
}

export default function Link({label, callBack}: Props)
{
    return (
        <TouchableHighlight onPress={callBack} underlayColor={"#FFFFFF"}>
            <Text style={CommonStyles.link}>{label}</Text>
        </TouchableHighlight>
    )
}